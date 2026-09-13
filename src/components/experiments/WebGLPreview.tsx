import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface WebGLPreviewProps {
  interactive?: boolean;
  className?: string;
  isDetail?: boolean;
}

export const WebGLPreview: React.FC<WebGLPreviewProps> = ({
  interactive = true,
  className = '',
  isDetail = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const mouseRef = useRef({ x: 0.5, y: 0.5, speed: 0, lastX: 0.5, lastY: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Swiss Liquid Cursor & Fluid Viscous Displacement
    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_speed;
      uniform float u_is_detail;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = st;
        uv.x *= aspect;
        
        vec2 m = u_mouse;
        m.x *= aspect;

        // Vector to mouse
        vec2 toMouse = uv - m;
        float dist = length(toMouse);

        // Fluid ripple displacement wave
        float wave = sin(dist * 28.0 - u_time * 4.0) * exp(-dist * 4.5) * (0.04 + u_speed * 0.12);
        vec2 displaced = st + normalize(toMouse + 0.001) * wave;

        // Swiss Architectural Grid lines
        float gridSize = u_is_detail > 0.5 ? 24.0 : 16.0;
        vec2 grid = fract(displaced * gridSize);
        float lineX = step(0.96, grid.x);
        float lineY = step(0.96, grid.y);
        float gridLine = max(lineX, lineY);

        // Fluid viscous contour rings
        float ring = sin(dist * 35.0 - u_time * 2.5);
        float contour = smoothstep(0.7, 0.9, ring) * exp(-dist * 3.0);

        // Base Swiss off-white background
        vec3 color = vec3(0.97, 0.97, 0.97);

        // Dark grid lines
        color = mix(color, vec3(0.08, 0.08, 0.08), gridLine * 0.75);

        // Proximity dark density
        float darkVignette = smoothstep(0.6, 0.0, dist) * 0.25;
        color = mix(color, vec3(0.12, 0.12, 0.12), darkVignette);

        // Swiss Red (#FF3000) fluid impulse ring near cursor
        float redImpulse = smoothstep(0.18, 0.02, dist) * (0.4 + u_speed * 1.5);
        color = mix(color, vec3(1.0, 0.188, 0.0), clamp(redImpulse, 0.0, 0.95));

        // Precision focal dot
        if (dist < 0.012) {
          color = vec3(1.0, 0.188, 0.0);
        }

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile Shader Helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad Geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttrLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttrLoc);
    gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uSpeed = gl.getUniformLocation(program, 'u_speed');
    const uDetail = gl.getUniformLocation(program, 'u_is_detail');

    setIsReady(true);

    // Resize handling
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 200;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    updateSize();

    let resizeRafId: number | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        updateSize();
      });
    });
    resizeObserver.observe(container);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      const dx = x - mouseRef.current.lastX;
      const dy = y - mouseRef.current.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current.speed = Math.min(dist * 12.0, 1.0);
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;
    };

    const handleMouseLeave = () => {
      mouseRef.current.speed = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // IntersectionObserver
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Render loop
    let startTime = performance.now();
    let animId: number | null = null;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);

      if (!isVisibleRef.current) return;

      const elapsed = (time - startTime) * 0.001 * (reducedMotion ? 0.2 : 1.0);

      // Decelerate speed
      mouseRef.current.speed *= 0.94;

      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uSpeed, mouseRef.current.speed);
      gl.uniform1f(uDetail, isDetail ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      io.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [interactive, isDetail, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[220px] bg-[#FBFBFB] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <div className="absolute top-2 left-2 z-10 text-[9px] font-mono text-neutral-500 font-bold pointer-events-none">
        GLSL // FLUID_FIELD // 60FPS
      </div>
      <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-[#FF3000] font-bold pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-[#FF3000] animate-pulse inline-block" />
        VISCOUS IMPULSE
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
          COMPILING SHADER...
        </div>
      )}
    </div>
  );
};
