import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(124,58,237,.5), transparent 55%), radial-gradient(circle at 80% 0%, rgba(59,130,246,.45), transparent 40%), #0f1022",
          color: "white",
          fontFamily: "Inter, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 26, opacity: 0.95 }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,.12)",
              fontWeight: 700
            }}
          >
            R
          </div>
          Revify Studio
        </div>
        <div style={{ maxWidth: "870px" }}>
          <p style={{ margin: 0, fontSize: 58, lineHeight: 1.08, fontWeight: 700 }}>
            Freelance websites that combine premium design with real growth performance.
          </p>
        </div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,.8)" }}>
          Next.js Development • Conversion UX • Marketing Systems
        </div>
      </div>
    ),
    { ...size }
  );
}
