#!/usr/bin/env python3
"""
Pre-extract 64 WebP frames + center.webp from character.mp4 for cursor-tracking.

Usage:
  python3 scripts/extract_character_frames.py

Requires: opencv-python-headless, pillow, numpy
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "client" / "public" / "character.mp4"
OUT_DIR = ROOT / "client" / "public" / "frames"
WEBP_QUALITY = 90
FRAME_COUNT_TARGET = 64


def detect_background(frame: np.ndarray) -> tuple[np.ndarray, str]:
    samples = np.vstack(
        [
            frame[0:20, 0:20].reshape(-1, 3),
            frame[0:20, -20:].reshape(-1, 3),
            frame[-20:, 0:20].reshape(-1, 3),
            frame[-20:, -20:].reshape(-1, 3),
        ]
    )
    bgr = np.median(samples, axis=0).astype(np.float32)
    hex_color = f"#{int(bgr[2]):02x}{int(bgr[1]):02x}{int(bgr[0]):02x}"
    return bgr, hex_color


def face_metrics(frame: np.ndarray, bg: np.ndarray) -> dict | None:
    h, w = frame.shape[:2]
    dist = np.linalg.norm(frame.astype(np.float32) - bg, axis=2)
    mask = (dist > 30).astype(np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    ys, xs = np.where(mask > 0)
    if len(xs) < 100:
        return None
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    hy1 = y0 + int(0.48 * (y1 - y0))
    roi = frame[y0:hy1, x0:x1]
    mean = np.mean(roi, axis=2)
    faceish = ((mask[y0:hy1, x0:x1] > 0) & (mean > 55) & (mean < 200)).astype(np.uint8)
    head = mask[y0:hy1, x0:x1]
    yy, xx = np.where(faceish > 0)
    hy, hx = np.where(head > 0)
    if len(xx) < 20 or len(hx) < 20:
        return None
    fx, fy = xx.mean() + x0, yy.mean() + y0
    body_band = mask[int(y0 + 0.55 * (y1 - y0)) : y1, :]
    bys, bxs = np.where(body_band > 0)
    body_cx = float(bxs.mean()) if len(bxs) else w / 2
    return {"fx": fx, "fy": fy, "body_cx": body_cx}


def ang_diff(a: np.ndarray, b: float) -> np.ndarray:
    d = (a - b + np.pi) % (2 * np.pi) - np.pi
    return np.abs(d)


def save_webp(bgr: np.ndarray, path: Path) -> None:
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(path, "WEBP", quality=WEBP_QUALITY, method=6)


def main() -> int:
    if not VIDEO.exists():
        print(f"Missing video: {VIDEO}", file=sys.stderr)
        return 1

    cap = cv2.VideoCapture(str(VIDEO))
    if not cap.isOpened():
        print(f"Could not open {VIDEO}", file=sys.stderr)
        return 1

    fps = float(cap.get(cv2.CAP_PROP_FPS) or 0)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0)
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0)
    duration = total / fps if fps else 0

    print("=== Video inspection ===")
    print(f"  path:     {VIDEO}")
    print(f"  frames:   {total}")
    print(f"  fps:      {fps}")
    print(f"  size:     {width}x{height}")
    print(f"  duration: {duration:.2f}s")

    ok, first = cap.read()
    if not ok:
        print("Failed to read first frame", file=sys.stderr)
        return 1

    bg, bg_hex = detect_background(first)
    print(f"  bg RGB:   {bg_hex} (from corner median)")

    frames_bgr: list[np.ndarray] = [first]
    metrics: list[dict | None] = [face_metrics(first, bg)]
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        frames_bgr.append(frame)
        metrics.append(face_metrics(frame, bg))
    cap.release()

    n = len(frames_bgr)
    print(f"  loaded:   {n} frames into memory")

    valid = [i for i, m in enumerate(metrics) if m is not None]
    fxs = np.array([metrics[i]["fx"] for i in valid])
    fys = np.array([metrics[i]["fy"] for i in valid])
    body = np.array([metrics[i]["body_cx"] for i in valid])
    dx = fxs - body
    med_y = float(np.median(fys))
    dy = fys - med_y
    dx_n = dx / (np.std(dx) + 1e-6)
    dy_n = dy / (np.std(dy) + 1e-6)
    look_ang = np.arctan2(dy_n, dx_n)  # 0=right, pi/2=down, ±pi=left, -pi/2=up

    look_by_frame = np.full(n, np.nan)
    mag_by_frame = np.full(n, 0.0)
    for idx, fi in enumerate(valid):
        look_by_frame[fi] = look_ang[idx]
        mag_by_frame[fi] = float(np.hypot(dx_n[idx], dy_n[idx]))

    compass_targets = {
        "RIGHT": 0.0,
        "DOWN-RIGHT": np.pi / 4,
        "DOWN": np.pi / 2,
        "DOWN-LEFT": 3 * np.pi / 4,
        "LEFT": np.pi,
        "UP-LEFT": -3 * np.pi / 4,
        "UP": -np.pi / 2,
        "UP-RIGHT": -np.pi / 4,
    }

    # Prefer active look-around (exclude trailing center hold)
    search_end = max(1, n - 30)
    compass: dict[str, int] = {}
    print("\n=== Compass directions (frame indices) ===")
    for name, target in compass_targets.items():
        candidates = [i for i in valid if i < search_end]
        la = np.array([look_by_frame[i] for i in candidates])
        mag = np.array([mag_by_frame[i] for i in candidates])
        score = ang_diff(la, target) - 0.15 * mag
        best = candidates[int(np.argmin(score))]
        compass[name] = best
        print(
            f"  {name:12s}: frame {best:3d}  "
            f"look={np.degrees(look_by_frame[best]):7.1f}°  mag={mag_by_frame[best]:.2f}"
        )

    center = n - 1
    compass["CENTER"] = center
    print(f"  {'CENTER':12s}: frame {center:3d}  (neutral eye-contact)")

    # 64 frames along 360°: index i ↔ angle i * 2π/64 (0 = RIGHT)
    print(f"\n=== Selecting {FRAME_COUNT_TARGET} circular frames ===")
    selected: list[int] = []
    used: set[int] = set()
    active = [i for i in valid if i < search_end]
    la_active = np.array([(look_by_frame[i] + 2 * np.pi) % (2 * np.pi) for i in active])
    mag_active = np.array([mag_by_frame[i] for i in active])

    for i in range(FRAME_COUNT_TARGET):
        target = i * (2 * np.pi / FRAME_COUNT_TARGET)
        diffs = np.minimum(np.abs(la_active - target), 2 * np.pi - np.abs(la_active - target))
        score = diffs - 0.08 * mag_active
        order = np.argsort(score)
        pick = active[int(order[0])]
        for cand_i in order[:20]:
            cand = active[int(cand_i)]
            if cand not in used or len(used) > FRAME_COUNT_TARGET - 4:
                pick = cand
                break
        used.add(pick)
        selected.append(pick)
        print(
            f"  frame_{i:02d}  target={np.degrees(target):6.1f}°  →  video f{pick:03d}  "
            f"look={np.degrees(look_by_frame[pick]):6.1f}°"
        )

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for old in OUT_DIR.glob("frame_*.webp"):
        old.unlink()
    center_path = OUT_DIR / "center.webp"
    if center_path.exists():
        center_path.unlink()

    print(f"\n=== Writing WebP → {OUT_DIR} ===")
    for i, fi in enumerate(selected):
        out = OUT_DIR / f"frame_{i:02d}.webp"
        save_webp(frames_bgr[fi], out)
        print(f"  wrote {out.name} (source frame {fi})")

    save_webp(frames_bgr[center], center_path)
    print(f"  wrote {center_path.name} (source frame {center})")

    meta = {
        "bg_hex": bg_hex,
        "bg_bgr": [float(bg[0]), float(bg[1]), float(bg[2])],
        "video": {
            "frames": n,
            "fps": fps,
            "width": width,
            "height": height,
            "duration_s": duration,
        },
        "compass": compass,
        "frames_64_source": selected,
        "center_source": center,
        "note": "Index i maps to angle i * 2π/64 via atan2(dy, dx); 0 = RIGHT.",
    }
    meta_path = OUT_DIR / "bg-color.json"
    meta_path.write_text(json.dumps(meta, indent=2) + "\n")
    print(f"  wrote {meta_path.name}")
    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
