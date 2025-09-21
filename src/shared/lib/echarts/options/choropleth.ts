import type { EChartsOption } from 'echarts';
import type { PrefectureMetric } from '@/entities/company';
import { formatCompanyCount } from '@/entities/company';

export const buildChoroplethOption = (
  data: PrefectureMetric[],
  mapName: string
): EChartsOption => {
  const values = data.map((item) => item.value);
  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 0;

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.name}<br/>企業数: ${formatCompanyCount(Number(params.value ?? 0))}`
    },
    visualMap: {
      min,
      max: max === min ? min + 1 : max,
      calculable: true,
      orient: 'vertical',
      left: 'right',
      top: 'bottom',
      inRange: {
        color: ['#0ea5e9', '#312e81']
      },
      text: ['多', '少']
    },
    series: [
      {
        type: 'map',
        map: mapName,
        roam: true,
        emphasis: {
          label: { show: true }
        },
        itemStyle: {
          borderColor: '#1e293b',
          borderWidth: 0.5
        },
        data: data.map((item) => ({
          name: item.name,
          value: item.value,
          code: item.code
        }))
      }
    ]
  } satisfies EChartsOption;
};
