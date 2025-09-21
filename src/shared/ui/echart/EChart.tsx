'use client';

import type { CSSProperties } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';

interface EChartProps {
  option: EChartsOption;
  style?: CSSProperties;
  className?: string;
  theme?: string;
  onEvents?: Record<string, (params: unknown) => void>;
}

export const EChart = ({ option, style, className, theme, onEvents }: EChartProps) => (
  <ReactEChartsCore
    echarts={echarts}
    option={option}
    theme={theme}
    style={style}
    className={className}
    onEvents={onEvents}
  />
);
