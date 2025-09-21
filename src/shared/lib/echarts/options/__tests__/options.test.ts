import { describe, expect, it } from 'vitest';
import {
  buildChoroplethOption,
  buildIndustryRankingOption,
  buildScaleDistributionOption,
  buildTrendOption
} from '../index';

const choroplethData = [
  { code: '01', name: '北海道', value: 1200 },
  { code: '13', name: '東京都', value: 5600 }
];

const rankingData = [
  { code: '01', name: '製造業', value: 2400 },
  { code: '02', name: '卸売・小売業', value: 1800 }
];

const scaleData = [
  { scale: 'micro', label: '小規模', value: 400 },
  { scale: 'large', label: '大企業', value: 1200 }
];

const trendData = [
  { year: '2012', value: 2000 },
  { year: '2015', value: 2300 },
  { year: '2018', value: 2500 }
];

describe('ECharts options', () => {
  it('creates choropleth option with series data', () => {
    const option = buildChoroplethOption(choroplethData, 'japan');
    expect(option.series).toBeDefined();
    const series = Array.isArray(option.series) ? option.series[0] : option.series;
    expect(series?.type).toBe('map');
    expect(Array.isArray(series?.data)).toBe(true);
  });

  it('creates industry ranking bar chart', () => {
    const option = buildIndustryRankingOption(rankingData);
    const series = Array.isArray(option.series) ? option.series[0] : option.series;
    expect(series?.type).toBe('bar');
    expect(series?.data).toHaveLength(2);
  });

  it('creates scale distribution donut', () => {
    const option = buildScaleDistributionOption(scaleData);
    const series = Array.isArray(option.series) ? option.series[0] : option.series;
    expect(series?.type).toBe('pie');
  });

  it('creates trend line chart', () => {
    const option = buildTrendOption(trendData);
    const series = Array.isArray(option.series) ? option.series[0] : option.series;
    expect(series?.type).toBe('line');
    expect(series?.data).toEqual(trendData.map((item) => item.value));
  });
});
