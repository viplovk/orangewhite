import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ThreePreviewProps {
  interactive?: boolean;
  className?: string;
  isDetail?: boolean;
}

export const ThreePreview: React.FC<ThreePreviewProps> = ({
  interactive = true,
  className = '',
  isDetail = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let mesh: THREE.Mesh | null = null;
    let pointsMesh: THREE.Points | null = null;
    let innerWire: THREE.LineSegments | null = null;
    let animFrameId: number | null = null;
    let resizeRafId: number | null = null;
    let isFallback2D = false;

    // Helper to safely get WebGL context with defensive getShaderPrecisionFormat shim
    const getSafeWebGLContext = (c: HTMLCanvasElement): WebGLRenderingContext | null => {
      try {
        const gl =
          c.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' }) ||
          c.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
        if (!gl) return null;

        // Defensive shim: ensure getShaderPrecisionFormat never returns null to avoid Three.js crash
        const orig = gl.getShaderPrecisionFormat?.bind(gl);
        (gl as any).getShaderPrecisionFormat = (st: number, pt: number) => {
          try {
            if (orig) {
              const res = orig(st, pt);
              if (res && typeof res.precision === 'number') return res;
            }
          } catch {
            // fallback
          }
          return { rangeMin: 1, rangeMax: 1, precision: 23 };
        };

        return gl as WebGLRenderingContext;
      } catch {
        return null;
      }
    };

    const glContext = getSafeWebGLContext(canvas);

    if (glContext) {
      try {
        // 1. Setup Scene
        scene = new THREE.Scene();

        // 2. Setup Camera
        const width = container.clientWidth || 300;
        const height = container.clientHeight || 200;
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = isDetail ? 3.4 : 3.8;

        // 3. Setup Renderer with safe context and medium precision
        renderer = new THREE.WebGLRenderer({
          canvas,
          context: glContext,
          precision: 'mediump',
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        });
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        // 4. Create Abstract Procedural Geometry: Torus Knot with Swiss aesthetic
        const geometry = new THREE.TorusKnotGeometry(
          0.9,
          0.28,
          isDetail ? 100 : 70,
          isDetail ? 24 : 16,
          2,
          3
        );

        // Wireframe Material
        const material = new THREE.MeshBasicMaterial({
          color: 0x111111,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Swiss Red Accent Vertices
        const pointsMat = new THREE.PointsMaterial({
          color: 0xff3000,
          size: isDetail ? 0.035 : 0.028,
          transparent: true,
          opacity: 0.9,
        });
        pointsMesh = new THREE.Points(geometry, pointsMat);
        scene.add(pointsMesh);

        // Inner Core Geodesic Wireframe
        const innerGeom = new THREE.IcosahedronGeometry(0.5, 1);
        const innerMat = new THREE.MeshBasicMaterial({
          color: 0x888888,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        });
        innerWire = new THREE.LineSegments(
          new THREE.WireframeGeometry(innerGeom),
          innerMat
        );
        scene.add(innerWire);

        setIsReady(true);
      } catch (err) {
        console.warn('ThreePreview WebGL init failed, switching to 2D canvas fallback:', err);
        isFallback2D = true;
      }
    } else {
      isFallback2D = true;
    }

    // 2D Canvas Fallback if WebGL is unavailable or failed
    let ctx2D: CanvasRenderingContext2D | null = null;
    if (isFallback2D) {
      try {
        ctx2D = canvas.getContext('2d');
        setIsReady(true);
      } catch {
        // ignore
      }
    }

    // Handle Container Resize with requestAnimationFrame to prevent ResizeObserver loop error
    const resizeObserver = new ResizeObserver((entries) => {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        if (!entries[0]) return;
        const { width, height } = entries[0].contentRect;
        if (width === 0 || height === 0) return;

        if (renderer && camera) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        } else if (ctx2D) {
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          canvas.width = width * dpr;
          canvas.height = height * dpr;
        }
      });
    });
    resizeObserver.observe(container);

    // Mouse Tracking for subtle camera / rotation responsiveness
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x * 0.8;
      mousePos.current.targetY = y * 0.8;
    };

    const handleMouseLeave = () => {
      mousePos.current.targetX = 0;
      mousePos.current.targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // IntersectionObserver: Only loop animation when visible in viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Animation Loop
    let clock = 0;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      // Smooth lerp mouse coordinates
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      const speed = reducedMotion ? 0.002 : 0.009;
      clock += speed;

      if (renderer && scene && camera && mesh) {
        mesh.rotation.x = clock * 0.8 + mousePos.current.y * 0.5;
        mesh.rotation.y = clock * 1.1 + mousePos.current.x * 0.5;

        if (pointsMesh) {
          pointsMesh.rotation.x = mesh.rotation.x;
          pointsMesh.rotation.y = mesh.rotation.y;
        }

        if (innerWire) {
          innerWire.rotation.x = -clock * 0.5;
          innerWire.rotation.y = -clock * 0.7;
        }

        renderer.render(scene, camera);
      } else if (ctx2D) {
        // Fallback 2D wireframe ring projection
        const w = container.clientWidth;
        const h = container.clientHeight;
        ctx2D.clearRect(0, 0, canvas.width, canvas.height);
        ctx2D.save();
        ctx2D.scale(canvas.width / w, canvas.height / h);
        ctx2D.translate(w / 2, h / 2);

        const nodes = 32;
        ctx2D.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx2D.lineWidth = 1;
        ctx2D.beginPath();
        for (let i = 0; i <= nodes; i++) {
          const theta = (i / nodes) * Math.PI * 2;
          const r = 55 + 18 * Math.sin(theta * 3 + clock * 2);
          const px = r * Math.cos(theta + mousePos.current.x * 0.3);
          const py = r * Math.sin(theta + mousePos.current.y * 0.3) * 0.6;
          if (i === 0) ctx2D.moveTo(px, py);
          else ctx2D.lineTo(px, py);
        }
        ctx2D.stroke();

        // Swiss red accent node
        const redTheta = clock * 2.5;
        const rx = 55 * Math.cos(redTheta);
        const ry = 55 * Math.sin(redTheta) * 0.6;
        ctx2D.fillStyle = '#FF3000';
        ctx2D.beginPath();
        ctx2D.arc(rx, ry, 3.5, 0, Math.PI * 2);
        ctx2D.fill();

        ctx2D.restore();
      }
    };

    animate();

    // Comprehensive Resource Disposal
    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      io.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);

      if (mesh) {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      }
      if (pointsMesh) {
        (pointsMesh.material as THREE.Material).dispose();
      }
      if (innerWire) {
        innerWire.geometry.dispose();
        (innerWire.material as THREE.Material).dispose();
      }
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }, [interactive, isDetail, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[220px] bg-[#FBFBFB] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* Precision Swiss Grid Underlay */}
      <div className="absolute inset-0 swiss-grid-pattern opacity-15 pointer-events-none" />

      {/* Subtle Coordinate Crosshairs */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-neutral-400 font-bold select-none pointer-events-none">
        +3D.TOPOLOGY // T-KNOT
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-neutral-400 font-bold select-none pointer-events-none">
        0.009 rad/s
      </div>

      <canvas ref={canvasRef} className="relative z-10 w-full h-full block" />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
          INITIALIZING THREE.JS ENGINE...
        </div>
      )}
    </div>
  );
};
