'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CompanyDetail, CompanyOverview, PrefectureCode } from '@/entities/company';
import { EstatApi } from '@/shared/api/estat';
import { ensureEChartsTheme } from '@/shared/theme';
import { FilterPanel, selectFilters, useCompanyFilterStore } from '@/features/filter-companies';
import { DetailPanel } from '@/widgets/detail-panel';
import { MapPanel } from '@/widgets/map-panel';

export const OverviewPage = () => {
  const filters = useCompanyFilterStore(selectFilters);
  const setConfig = useCompanyFilterStore((state) => state.setConfig);

  const [overview, setOverview] = useState<CompanyOverview | null>(null);
  const [detail, setDetail] = useState<CompanyDetail | null>(null);
  const [selectedPrefecture, setSelectedPrefecture] = useState<PrefectureCode | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [detailStatus, setDetailStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const theme = useMemo(() => ensureEChartsTheme(), []);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    EstatApi.fetchCompanyOverview(filters)
      .then((data) => {
        if (!active) return;
        setOverview(data);
        setConfig(data.filters);
        if (!selectedPrefecture && data.choropleth.length > 0) {
          setSelectedPrefecture(data.choropleth[0]?.code ?? null);
        }
        setStatus('idle');
      })
      .catch((error) => {
        console.error(error);
        if (active) {
          setStatus('error');
        }
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.year, filters.industry, filters.scale]);

  useEffect(() => {
    if (!selectedPrefecture) {
      setDetail(null);
      return;
    }
    let active = true;
    setDetailStatus('loading');
    EstatApi.fetchCompanyDetail(selectedPrefecture, filters)
      .then((data) => {
        if (!active) return;
        setDetail(data);
        setDetailStatus('idle');
      })
      .catch((error) => {
        console.error(error);
        if (active) {
          setDetailStatus('error');
        }
      });
    return () => {
      active = false;
    };
  }, [filters.industry, filters.scale, filters.year, selectedPrefecture]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#111c34] px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:grid lg:grid-cols-[320px_1fr]">
        <aside className="order-2 flex flex-col gap-6 lg:order-1">
          <FilterPanel />
          {status === 'error' && (
            <div className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
              データの取得に失敗しました。ネットワークや API キーを確認してください。
            </div>
          )}
        </aside>
        <section className="order-1 flex flex-col gap-6 lg:order-2">
          <MapPanel
            data={overview?.choropleth ?? []}
            selectedPrefecture={selectedPrefecture}
            onSelectPrefecture={setSelectedPrefecture}
            theme={theme}
          />
          <DetailPanel detail={detailStatus === 'error' ? null : detail} theme={theme} />
          {detailStatus === 'error' && (
            <div className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
              詳細データの取得に失敗しました。別の条件をお試しください。
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
