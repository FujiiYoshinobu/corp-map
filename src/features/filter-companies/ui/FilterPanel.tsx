'use client';

import { useMemo } from 'react';
import { Card, Select } from '@/shared/ui';
import { selectConfig, selectFilters, useCompanyFilterStore } from '../model/store';

export const FilterPanel = () => {
  const config = useCompanyFilterStore(selectConfig);
  const filters = useCompanyFilterStore(selectFilters);
  const setFilter = useCompanyFilterStore((state) => state.setFilter);

  const content = useMemo(() => {
    if (!config) {
      return <p className="text-sm text-slate-400">フィルタを準備しています…</p>;
    }

    return (
      <div className="flex flex-col gap-6">
        <Select
          label="年度"
          value={filters.year}
          options={config.years}
          onChange={(value) => setFilter('year', value)}
        />
        <Select
          label="業種"
          value={filters.industry}
          options={config.industries}
          onChange={(value) => setFilter('industry', value)}
        />
        <Select
          label="企業規模"
          value={filters.scale}
          options={config.scales}
          onChange={(value) => setFilter('scale', value)}
        />
      </div>
    );
  }, [config, filters, setFilter]);

  return (
    <Card title="絞り込み" subtitle="年度・業種・規模で集計を切り替え">
      {content}
    </Card>
  );
};
