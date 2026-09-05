import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RefreshCw, Zap } from 'lucide-react';

export const InteractiveBeyond: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<'bauhaus' | 'grid' | 'particles'>('bauhaus');
  const [fps, setFps] = useState(60);
  const animationRef = useRef<number | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 200, y: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 320);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 320;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const nodeCount = 35;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() > 0.8 ? 8 : 4,
      isRed: Math.random() > 0.75,
    }));

    let lastTime = performance.now();
    let frameCounter = 0;

    const render = (time: number) => {
      frameCounter++;
      if (time - lastTime >= 1000) {
        setFps(frameCounter);
        frameCounter = 0;
        lastTime = time;
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.lineWidth = 1;
      const step = 24;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (mode === 'bauhaus') {
        // Draw Bauhaus geometric compositions reacting to mouse
        const mx = mousePos.current.x;
        const my = mousePos.current.y;

        // Swiss red circle
        ctx.fillStyle = '#FF3000';
        ctx.beginPath();
        ctx.arc(mx * 0.4 + width * 0.3, my * 0.4 + height * 0.3, 40, 0, Math.PI * 2);
        ctx.fill();

        // Black structural rectangle
        ctx.fillStyle = '#000000';
        ctx.fillRect(width * 0.5 - 30, height * 0.2, 70, 100);

        // Thin diagonal line
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width * 0.2, height * 0.8);
        ctx.lineTo(width * 0.8, height * 0.2);
        ctx.stroke();

        // Typographic overlay
        ctx.font = '900 32px Inter, sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText('BEYOND // 60FPS', 24, height - 30);
      }

      // Update & Draw nodes
      nodes.forEach((node, i) => {
        if (isRunning) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Mouse repulsion
          const dx = node.x - mousePos.current.x;
          const dy = node.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            node.x += (dx / dist) * 2;
            node.y += (dy / dist) * 2;
          }
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(node.x - n2.x, node.y - n2.y);
          if (dist < 90) {
            ctx.strokeStyle = `rgba(0,0,0,${(1 - dist / 90) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.fillStyle = node.isRed ? '#FF3000' : '#000000';
        ctx.fillRect(node.x - node.size / 2, node.y - node.size / 2, node.size, node.size);
      });

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, mode]);

  return (
    <div className="w-full border-4 border-black bg-white font-mono text-xs">
      {/* Control Bar */}
      <div className="p-3 bg-black text-white flex flex-wrap items-center justify-between gap-3 border-b-4 border-black">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#FF3000]" />
          <span className="font-black uppercase tracking-widest">
            BEYOND // KINETIC CANVAS TELEMETRY
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>FPS: <strong className="text-[#FF3000]">{fps}</strong></span>
          <span>NODES: <strong>35</strong></span>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-2 py-1 bg-white text-black hover:bg-[#FF3000] hover:text-white uppercase font-bold flex items-center gap-1"
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isRunning ? 'PAUSE' : 'RUN'}
          </button>
        </div>
      </div>

      {/* Mode Switches */}
      <div className="flex border-b-2 border-black bg-[#F2F2F2]">
        {(['bauhaus', 'grid', 'particles'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 font-bold uppercase text-[11px] border-r-2 border-black transition-colors ${
              mode === m ? 'bg-white text-black' : 'hover:bg-white text-neutral-600'
            }`}
          >
            {m} MODE
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[320px] bg-white cursor-crosshair overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-2 right-3 pointer-events-none text-[9px] text-neutral-400 uppercase font-mono">
          DRAG MOUSE OVER CANVAS TO DISRUPT VECTOR FIELD
        </div>
      </div>
    </div>
  );
};
