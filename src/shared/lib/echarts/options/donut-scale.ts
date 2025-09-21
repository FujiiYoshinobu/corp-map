import type { EChartsOption } from 'echarts';
import type { ScaleDistributionItem } from '@/entities/company';
import { formatCompanyCount, formatPercentage } from '@/entities/company';

export const buildScaleDistributionOption = (
  data: ScaleDistributionItem[]
): EChartsOption => {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) =>
        `${params.name}<br/>企業数: ${formatCompanyCount(Number(params.value ?? 0))}<br/>構成比: ${formatPercentage(
          (Number(params.value ?? 0) / total) * 100
        )}`
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '企業規模',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#0f172a',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: ({ value }) => formatCompanyCount(Number(value ?? 0))
        },
        data: data.map((item) => ({
          name: item.label,
          value: item.value
        }))
      }
    ]
  } satisfies EChartsOption;
};
