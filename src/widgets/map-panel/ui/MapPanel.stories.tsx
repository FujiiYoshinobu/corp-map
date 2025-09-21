'use client';

import { useEffect, useState } from 'react';
import type { StoryDefinition } from '@/shared/lib/storybook/types';
import { ensureJapanMap } from '@/shared/lib/echarts';
import { ensureEChartsTheme } from '@/shared/theme';
import overview from '../../../../public/mock/company-overview.json';
import { MapPanel } from './MapPanel';

const mockData = overview.choropleth;

const MapPanelStory = () => {
  const [selected, setSelected] = useState<string | null>(mockData[12]?.prefecture_code ?? null);
  const theme = ensureEChartsTheme();

  useEffect(() => {
    ensureJapanMap().catch((error) => console.error(error));
  }, []);

  return (
    <MapPanel
      data={mockData.map((item) => ({
        code: item.prefecture_code,
        name: item.prefecture_name,
        value: item.value
      }))}
      selectedPrefecture={selected}
      onSelectPrefecture={setSelected}
      theme={theme}
    />
  );
};

export const storyDefinitions: StoryDefinition[] = [
  {
    id: 'map-panel/default',
    title: '全国 Choropleth',
    group: 'Widgets/MapPanel',
    render: () => <MapPanelStory />
  }
];
