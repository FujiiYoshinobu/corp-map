import type { EChartsOption } from 'echarts';
import type { TrendItem } from '@/entities/company';
import { formatCompanyCount } from '@/entities/company';

export const buildTrendOption = (data: TrendItem[]): EChartsOption => {
  const sorted = [...data].sort((a, b) => Number(a.year) - Number(b.year));
  return {
    grid: { left: 48, right: 24, top: 32, bottom: 48 },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const item = Array.isArray(params) ? params[0] : params;
        return `${item.axisValueLabel}<br/>企業数: ${formatCompanyCount(Number(item.value ?? 0))}`;
      }
    },
    xAxis: {
      type: 'category',
      data: sorted.map((item) => item.year),
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => formatCompanyCount(value)
      }
    },
    series: [
      {
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbolSize: 10,
        lineStyle: {
          width: 3
        },
        areaStyle: {
          opacity: 0.2
        },
        data: sorted.map((item) => item.value)
      }
    ]
  } satisfies EChartsOption;
};
