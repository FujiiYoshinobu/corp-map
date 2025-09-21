'use client';

import { useEffect } from 'react';
import type { StoryDefinition } from '@/shared/lib/storybook/types';
import { FilterPanel } from './FilterPanel';
import { useCompanyFilterStore } from '../model/store';

const mockConfig = {
  years: [
    { value: '2012', label: '2012年' },
    { value: '2016', label: '2016年' },
    { value: '2021', label: '2021年' }
  ],
  industries: [
    { value: 'all', label: '全業種' },
    { value: '01', label: '製造業' },
    { value: '02', label: '卸売・小売業' }
  ],
  scales: [
    { value: 'all', label: '全規模' },
    { value: 'sme', label: '中小企業' },
    { value: 'large', label: '大企業' }
  ]
};

const FilterPanelStory = () => {
  const setConfig = useCompanyFilterStore((state) => state.setConfig);
  useEffect(() => {
    setConfig(mockConfig);
  }, [setConfig]);

  return (
    <div className="max-w-sm">
      <FilterPanel />
    </div>
  );
};

export const storyDefinitions: StoryDefinition[] = [
  {
    id: 'filter-panel/default',
    title: 'フィルタパネル',
    group: 'Features/Filter',
    render: () => <FilterPanelStory />
  }
];
