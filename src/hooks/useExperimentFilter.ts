import { useState, useMemo } from 'react';
import { EXPERIMENTS, Experiment, EXPERIMENTS_CATEGORIES, ExperimentCategory } from '../data/experiments';

export interface ExperimentStats {
  total: number;
  active: number;
  categoriesCount: number;
}

export const useExperimentFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExperimentCategory>('ALL');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    EXPERIMENTS_CATEGORIES.forEach((cat) => {
      if (cat === 'ALL') {
        counts[cat] = EXPERIMENTS.length;
      } else {
        counts[cat] = EXPERIMENTS.filter((exp) => exp.categories.includes(cat)).length;
      }
    });
    return counts;
  }, []);

  // Filtered experiments
  const filteredExperiments = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return EXPERIMENTS;
    }
    return EXPERIMENTS.filter((exp) => exp.categories.includes(selectedCategory));
  }, [selectedCategory]);

  // Overall laboratory statistics
  const stats: ExperimentStats = useMemo(() => {
    const activeCount = EXPERIMENTS.filter((e) => e.status === 'ACTIVE').length;
    return {
      total: EXPERIMENTS.length,
      active: activeCount,
      categoriesCount: EXPERIMENTS_CATEGORIES.length - 1, // minus 'ALL'
    };
  }, []);

  // Random experiment selector for "SURPRISE ME ↗"
  const getRandomExperiment = (): Experiment => {
    const randomIndex = Math.floor(Math.random() * EXPERIMENTS.length);
    return EXPERIMENTS[randomIndex];
  };

  return {
    selectedCategory,
    setSelectedCategory,
    filteredExperiments,
    categoryCounts,
    stats,
    getRandomExperiment,
    categories: EXPERIMENTS_CATEGORIES,
  };
};
