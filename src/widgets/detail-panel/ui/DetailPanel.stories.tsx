'use client';

import type { StoryDefinition } from '@/shared/lib/storybook/types';
import { ensureEChartsTheme } from '@/shared/theme';
import details from '../../../../public/mock/company-details.json';
import { DetailPanel } from './DetailPanel';

const mockDetail = Object.values(details)[0] as (typeof details)[keyof typeof details];

const DetailPanelStory = () => {
  const theme = ensureEChartsTheme();
  return (
    <DetailPanel
      detail={{
        prefecture: {
          code: mockDetail.prefecture_code,
          name: mockDetail.prefecture_name,
          value: mockDetail.industries.reduce((sum, item) => sum + item.value, 0)
        },
        industries: mockDetail.industries,
        scales: mockDetail.scales,
        trend: mockDetail.trend
      }}
      theme={theme}
    />
  );
};

export const storyDefinitions: StoryDefinition[] = [
  {
    id: 'detail-panel/tokyo',
    title: '東京都 詳細',
    group: 'Widgets/DetailPanel',
    render: () => <DetailPanelStory />
  }
];
