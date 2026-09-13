import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. Guard against benign browser ResizeObserver notification loops
if (typeof window !== 'undefined') {
  const isResizeObserverError = (msg?: string) =>
    Boolean(
      msg &&
        (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
          msg.includes('ResizeObserver loop limit exceeded'))
    );

  window.addEventListener('error', (event) => {
    if (isResizeObserverError(event.message) || isResizeObserverError(event.error?.message)) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return true;
    }
  });

  const origOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    const msgStr = typeof message === 'string' ? message : error?.message || '';
    if (isResizeObserverError(msgStr)) {
      return true;
    }
    if (origOnError) {
      return origOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  // 2. Defensive shim for WebGL getShaderPrecisionFormat in headless/iframe environments
  // Ensures THREE.WebGLRenderer does not crash when getShaderPrecisionFormat returns null
  try {
    const patchPrecision = (proto: any) => {
      if (proto && typeof proto.getShaderPrecisionFormat === 'function') {
        const orig = proto.getShaderPrecisionFormat;
        proto.getShaderPrecisionFormat = function (shaderType: number, precisionType: number) {
          try {
            const res = orig.call(this, shaderType, precisionType);
            if (res && typeof res.precision === 'number') {
              return res;
            }
          } catch {
            // fallback below
          }
          return { rangeMin: 1, rangeMax: 1, precision: 23 };
        };
      }
    };

    if (typeof WebGLRenderingContext !== 'undefined') {
      patchPrecision(WebGLRenderingContext.prototype);
    }
    if (typeof WebGL2RenderingContext !== 'undefined') {
      patchPrecision(WebGL2RenderingContext.prototype);
    }
  } catch {
    // ignore
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
