import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  className?: string;
  /** When false, RAF loop pauses (tab hidden / hero off-screen). */
  active?: boolean;
}

/**
 * Lightweight Three.js field: drifting red/white particles + soft mesh veil.
 * No video seeking — GPU particles only for atmosphere behind the portrait.
 */
export default function HeroCanvas({ className, active = true }: HeroCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = reduced ? 80 : 420;
    const brand =
      getComputedStyle(document.documentElement).getPropertyValue('--brand-red').trim() ||
      '#FA0101';
    const RED = new THREE.Color(brand);
    const WHITE = new THREE.Color('#ffffff');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      const c = Math.random() > 0.72 ? WHITE : RED;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      speeds[i] = 0.15 + Math.random() * 0.45;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const veilGeo = new THREE.PlaneGeometry(16, 10, 32, 24);
    const veilMat = new THREE.MeshBasicMaterial({
      color: RED,
      transparent: true,
      opacity: 0.035,
      wireframe: true,
    });
    const veil = new THREE.Mesh(veilGeo, veilMat);
    veil.position.z = -2.5;
    scene.add(veil);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let running = false;
    const clock = new THREE.Clock();
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;

    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      if (!reduced) {
        for (let i = 0; i < count; i++) {
          const iy = i * 3 + 1;
          posAttr.array[iy] += Math.sin(t * speeds[i] + i) * 0.002;
          posAttr.array[i * 3] += Math.cos(t * speeds[i] * 0.7 + i) * 0.0015;
          if (posAttr.array[iy] > 5) posAttr.array[iy] = -5;
          if (posAttr.array[iy] < -5) posAttr.array[iy] = 5;
        }
        posAttr.needsUpdate = true;
        points.rotation.y = pointer.x * 0.12;
        points.rotation.x = pointer.y * 0.08;
        veil.rotation.z = Math.sin(t * 0.2) * 0.04 + pointer.x * 0.03;
        veil.position.x = pointer.x * 0.35;
        veil.position.y = pointer.y * 0.25;
      }

      camera.position.x = pointer.x * 0.25;
      camera.position.y = pointer.y * 0.2;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden || !activeRef.current) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const sync = () => {
      if (document.hidden || !activeRef.current) stop();
      else start();
    };

    document.addEventListener('visibilitychange', sync);
    sync();

    const poll = window.setInterval(() => {
      const shouldRun = !document.hidden && activeRef.current;
      if (shouldRun && !running) start();
      if (!shouldRun && running) stop();
    }, 250);

    return () => {
      stop();
      window.clearInterval(poll);
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      veilGeo.dispose();
      veilMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}
