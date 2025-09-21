'use client';

import { useEffect, useMemo, useState } from 'react';
import type { PrefectureCode, PrefectureMetric } from '@/entities/company';
import { Card, EChart } from '@/shared/ui';
import { ensureJapanMap } from '@/shared/lib/echarts';
import { buildChoroplethOption } from '@/shared/lib/echarts/options';

interface MapPanelProps {
  data: PrefectureMetric[];
  onSelectPrefecture?: (code: PrefectureCode) => void;
  selectedPrefecture?: PrefectureCode | null;
  theme: string;
}

export const MapPanel = ({ data, onSelectPrefecture, selectedPrefecture, theme }: MapPanelProps) => {
  const [mapName, setMapName] = useState('japan');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    ensureJapanMap()
      .then((name) => {
        if (mounted) {
          setMapName(name);
        }
      })
      .catch((err: unknown) => {
        console.error(err);
        if (mounted) {
          setError('地図データの読み込みに失敗しました');
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const option = useMemo(() => {
    const baseOption = buildChoroplethOption(data, mapName);
    if (Array.isArray(baseOption.series)) {
      baseOption.series = baseOption.series.map((series) => ({
        ...series,
        selectedMode: 'single',
        data: Array.isArray(series.data)
          ? series.data.map((item: any) => ({
              ...item,
              selected: selectedPrefecture ? item.code === selectedPrefecture : false
            }))
          : series.data
      }));
    }
    return baseOption;
  }, [data, mapName, selectedPrefecture]);

  return (
    <Card title="全国企業分布" subtitle="都道府県ごとの企業数をヒートマップで表示">
      {isLoading ? (
        <div className="flex h-[480px] items-center justify-center text-slate-400">地図を読み込み中…</div>
      ) : error ? (
        <div className="flex h-[480px] items-center justify-center text-red-300">{error}</div>
      ) : (
        <EChart
          option={option}
          theme={theme}
          style={{ height: 520, width: '100%' }}
          onEvents={{
            click: (params) => {
              const code = (params as any)?.data?.code as PrefectureCode | undefined;
              if (code && onSelectPrefecture) {
                onSelectPrefecture(code);
              }
            }
          }}
        />
      )}
    </Card>
  );
};
