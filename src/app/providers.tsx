'use client';

import { useEffect } from 'react';
import { ensureECharts } from '@/shared/lib/echarts';
import { ensureEChartsTheme } from '@/shared/theme';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    ensureECharts();
    ensureEChartsTheme();
  }, []);

  return <>{children}</>;
};
