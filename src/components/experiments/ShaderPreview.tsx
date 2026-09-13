import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ShaderPreviewProps {
  interactive?: boolean;
  className?: string;
  isDetail?: boolean;
}

export const ShaderPreview: React.FC<ShaderPreviewProps> = ({
  interactive = true,
  className = '',
  isDetail = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Procedural Swiss Voronoi & SDF Cellular Fields
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_is_detail;

      // 2D Hash function
      vec2 hash2(vec2 p) {
        return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
      }

      // Voronoi cellular distance
      vec3 voronoi(in vec2 x, in vec2 mouseOffset) {
        vec2 n = floor(x);
        vec2 f = fract(x);

        vec2 mg, mr;
        float md = 8.0;

        for (int j = -1; j <= 1; j++) {
          for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash2(n + g);
            // Animate points
            o = 0.5 + 0.4 * sin(u_time * 1.5 + 6.2831 * o);
            vec2 r = g + o - f;
            float d = dot(r, r);

            if (d < md) {
              md = d;
              mr = r;
              mg = g;
            }
          }
        }

        // Second pass for distance to edges (borders)
        md = 8.0;
        for (int j = -2; j <= 2; j++) {
          for (int i = -2; i <= 2; i++) {
            vec2 g = mg + vec2(float(i), float(j));
            vec2 o = hash2(n + g);
            o = 0.5 + 0.4 * sin(u_time * 1.5 + 6.2831 * o);
            vec2 r = g + o - f;

            if (dot(mr - r, mr - r) > 0.00001) {
              md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
            }
          }
        }

        return vec3(md, mr);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        float aspect = u_resolution.x / u_resolution.y;
        st.x *= aspect;

        vec2 mouse = u_mouse;
        mouse.x *= aspect;

        float scale = u_is_detail > 0.5 ? 6.5 : 4.5;
        vec3 c = voronoi(st * scale, mouse);

        // Distance to cell border
        float borderDist = c.x;
        float border = smoothstep(0.04, 0.08, borderDist);

        // Cell center distance
        float centerDist = length(c.yz);

        // Swiss Palette Base
        vec3 col = vec3(0.96, 0.96, 0.96);

        // Strong black border grid
        col = mix(vec3(0.04, 0.04, 0.04), col, border);

        // Center dot
        if (centerDist < 0.08) {
          col = vec3(0.08, 0.08, 0.08);
        }

        // Distance to pointer
        float dMouse = distance(st, mouse);
        if (dMouse < 0.28) {
          float proximity = (1.0 - dMouse / 0.28);
          // Tint active cell border with Swiss Red
          if (borderDist < 0.07) {
            col = mix(col, vec3(1.0, 0.188, 0.0), proximity * 0.9);
          }
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
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

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uDetail = gl.getUniformLocation(program, 'u_is_detail');

    setIsReady(true);

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

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    container.addEventListener('mousemove', handleMouseMove);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    let startTime = performance.now();
    let animId: number | null = null;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      const elapsed = (time - startTime) * 0.001 * (reducedMotion ? 0.1 : 0.8);

      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uTime, elapsed);
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
        VORONOI_SDF // GLSL
      </div>
      <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-neutral-400 font-bold pointer-events-none">
        DISTANCE METRIC 2D
      </div>

      <canvas ref={canvasRef} className="w-full h-full block" />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
          INITIALIZING GLSL SHADER...
        </div>
      )}
    </div>
  );
};
