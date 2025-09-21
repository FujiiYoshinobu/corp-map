'use client';

import { useMemo, useState } from 'react';
import type { CompanyDetail } from '@/entities/company';
import { Card, EChart } from '@/shared/ui';
import {
  buildIndustryRankingOption,
  buildScaleDistributionOption,
  buildTrendOption
} from '@/shared/lib/echarts/options';

const tabs = [
  { id: 'industry', label: '業種ランキング' },
  { id: 'scale', label: '規模構成' },
  { id: 'trend', label: '推移' }
] as const;

interface DetailPanelProps {
  detail: CompanyDetail | null;
  theme: string;
}

type TabId = (typeof tabs)[number]['id'];

export const DetailPanel = ({ detail, theme }: DetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('industry');

  const chartOption = useMemo(() => {
    if (!detail) {
      return null;
    }
    switch (activeTab) {
      case 'industry':
        return buildIndustryRankingOption(detail.industries);
      case 'scale':
        return buildScaleDistributionOption(detail.scales);
      case 'trend':
        return buildTrendOption(detail.trend);
      default:
        return null;
    }
  }, [activeTab, detail]);

  return (
    <Card
      title={detail ? `${detail.prefecture.name}の詳細` : '地域の詳細'}
      subtitle="選択した都道府県の業種別・規模別構成と推移"
    >
      {!detail ? (
        <div className="flex h-[420px] items-center justify-center text-slate-400">
          地図から都道府県を選択してください
        </div>
      ) : (
        <div className="flex h-[420px] flex-col gap-6">
          <div className="flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2 text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent/20 text-sky-200'
                    : 'bg-surface/60 text-slate-400 hover:bg-surface/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {chartOption && (
            <EChart option={chartOption} theme={theme} style={{ height: 340, width: '100%' }} />
          )}
        </div>
      )}
    </Card>
  );
};
