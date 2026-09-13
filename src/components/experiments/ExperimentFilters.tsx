import React from 'react';
import { EXPERIMENTS_CATEGORIES, ExperimentCategory } from '../../data/experiments';
import { sound } from '../../lib/sound';
import { Sparkles } from 'lucide-react';

interface ExperimentFiltersProps {
  selectedCategory: ExperimentCategory;
  onSelectCategory: (cat: ExperimentCategory) => void;
  categoryCounts: Record<string, number>;
  onSurpriseMe: () => void;
}

export const ExperimentFilters: React.FC<ExperimentFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  onSurpriseMe,
}) => {
  return (
    <div className="w-full border-b-4 border-black bg-white flex flex-col md:flex-row md:items-stretch justify-between">
      {/* Scrollable Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Filter experiments by discipline"
        className="flex items-stretch overflow-x-auto no-scrollbar flex-1 border-b-4 md:border-b-0 md:border-r-4 border-black"
      >
        {EXPERIMENTS_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                sound.playClick();
                onSelectCategory(category);
              }}
              data-cursor-text="FILTER"
              className={`px-4 sm:px-6 py-3.5 sm:py-4 text-xs font-mono font-bold tracking-widest uppercase border-r-2 border-black last:border-r-0 whitespace-nowrap transition-colors duration-150 flex items-center gap-2 cursor-pointer select-none group ${
                isSelected
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-[#FF3000] hover:text-white'
              }`}
            >
              <span className={isSelected ? 'text-[#FF3000]' : 'text-neutral-400 group-hover:text-white'}>
                [
              </span>
              <span>{category}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-xs ${
                isSelected 
                  ? 'bg-[#FF3000] text-white' 
                  : 'bg-neutral-200 text-neutral-800 group-hover:bg-white group-hover:text-black'
              }`}>
                {count < 10 ? `0${count}` : count}
              </span>
              <span className={isSelected ? 'text-[#FF3000]' : 'text-neutral-400 group-hover:text-white'}>
                ]
              </span>
            </button>
          );
        })}
      </div>

      {/* Surprise Me / Random Access Button */}
      <div className="flex items-stretch bg-white">
        <button
          onClick={() => {
            sound.playActivate();
            onSurpriseMe();
          }}
          data-cursor-text="RANDOM"
          className="w-full md:w-auto px-6 py-3.5 sm:py-4 bg-[#FF3000] text-white hover:bg-black uppercase font-mono font-bold text-xs tracking-widest flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer select-none group"
        >
          <Sparkles className="w-3.5 h-3.5 text-white group-hover:rotate-45 transition-transform duration-200" />
          <span>SURPRISE ME ↗</span>
          <span className="text-[9px] opacity-75 hidden xl:inline">
            // RANDOM_ACCESS
          </span>
        </button>
      </div>
    </div>
  );
};
