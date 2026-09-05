import React, { useState } from 'react';
import { RotateCcw, Delete, Equal } from 'lucide-react';

export const InteractiveCalc: React.FC = () => {
  const [expression, setExpression] = useState('19 * 4 + 7.95');
  const [result, setResult] = useState('83.95');
  const [history, setHistory] = useState<string[]>([
    '7.95 * 10 = 79.5',
    '19 * 4 + 7.95 = 83.95',
  ]);

  const handleInput = (val: string) => {
    setExpression((prev) => (prev === '0' || prev === 'Error' ? val : prev + val));
  };

  const handleClear = () => {
    setExpression('0');
    setResult('0');
  };

  const handleBackspace = () => {
    setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleEvaluate = () => {
    try {
      // Clean and safe mathematical expression evaluation
      // Replace arithmetic symbols
      const sanitized = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');

      // Simple safe evaluation of standard math characters only
      if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) {
        setResult('Syntax Error');
        return;
      }

      // eslint-disable-next-line no-eval
      const evalResult = Function(`'use strict'; return (${sanitized})`)();
      const formatted = Number.isFinite(evalResult)
        ? String(Math.round(evalResult * 100000) / 100000)
        : 'Undefined';

      setResult(formatted);
      setHistory((prev) => [`${expression} = ${formatted}`, ...prev.slice(0, 4)]);
    } catch {
      setResult('Error');
    }
  };

  const keys = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'DEL', '='],
  ];

  return (
    <div className="w-full max-w-md mx-auto border-4 border-black bg-white p-6 font-mono">
      {/* Title bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black text-xs font-bold uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#FF3000]" />
          VIPLOVK // CALC V1.0
        </span>
        <span className="text-[10px] text-neutral-500">PRECISION ARITHMETIC</span>
      </div>

      {/* Screen display */}
      <div className="p-4 bg-[#F2F2F2] border-4 border-black mb-4 text-right">
        <div className="text-xs text-neutral-500 truncate h-5 font-bold">
          {expression}
        </div>
        <div className="text-3xl font-black text-black tracking-tight mt-1 overflow-x-auto whitespace-nowrap">
          {result}
        </div>
      </div>

      {/* History strip */}
      <div className="mb-4 p-2 bg-white border-2 border-black text-[10px] text-neutral-600 space-y-1 max-h-16 overflow-y-auto">
        <div className="font-bold text-[#FF3000] uppercase">RECENT EVALUATIONS:</div>
        {history.map((h, i) => (
          <div key={i} className="truncate">
            {h}
          </div>
        ))}
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-4 gap-2">
        {keys.map((row, rIdx) =>
          row.map((btn, cIdx) => {
            const isOperator = ['÷', '×', '-', '+'].includes(btn);
            const isEqual = btn === '=';
            const isClear = btn === 'C';
            const isDel = btn === 'DEL';

            return (
              <button
                key={`${rIdx}-${cIdx}`}
                onClick={() => {
                  if (isEqual) handleEvaluate();
                  else if (isClear) handleClear();
                  else if (isDel) handleBackspace();
                  else handleInput(btn);
                }}
                className={`h-12 border-2 border-black text-sm font-black flex items-center justify-center cursor-pointer transition-colors duration-100 ${
                  isEqual
                    ? 'bg-[#FF3000] text-white hover:bg-black border-[#FF3000]'
                    : isOperator
                    ? 'bg-black text-white hover:bg-[#FF3000]'
                    : isClear || isDel
                    ? 'bg-[#F2F2F2] text-black hover:bg-[#FF3000] hover:text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {btn}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
