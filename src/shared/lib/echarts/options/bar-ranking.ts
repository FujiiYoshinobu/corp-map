import type { EChartsOption } from 'echarts';
import type { IndustryRankingItem } from '@/entities/company';
import { formatCompanyCount } from '@/entities/company';

export const buildIndustryRankingOption = (
  data: IndustryRankingItem[]
): EChartsOption => {
  const sorted = [...data].sort((a, b) => a.value - b.value);
  return {
    grid: { left: 120, right: 32, top: 24, bottom: 24 },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => formatCompanyCount(value)
      }
    },
    yAxis: {
      type: 'category',
      data: sorted.map((item) => item.name),
      axisLabel: {
        color: '#cbd5f5'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const item = Array.isArray(params) ? params[0] : params;
        return `${item.name}<br/>企業数: ${formatCompanyCount(Number(item.value ?? 0))}`;
      }
    },
    series: [
      {
        type: 'bar',
        data: sorted.map((item) => ({ value: item.value, name: item.name })),
        label: {
          show: true,
          position: 'right',
          formatter: ({ value }) => formatCompanyCount(Number(value ?? 0))
        },
        itemStyle: {
          borderRadius: [0, 12, 12, 0]
        }
      }
    ]
  } satisfies EChartsOption;
};
