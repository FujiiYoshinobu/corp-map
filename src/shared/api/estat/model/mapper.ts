import type { CompanyDetail, CompanyOverview, PrefectureMetric } from '@/entities/company';
import type { DetailEntryDto, OverviewResponseDto } from './types';

const mapPrefecture = (input: {
  prefecture_code: string;
  prefecture_name: string;
  value?: number;
}): PrefectureMetric => ({
  code: input.prefecture_code,
  name: input.prefecture_name,
  value: input.value ?? 0
});

export const mapOverviewDto = (dto: OverviewResponseDto): CompanyOverview => ({
  filters: {
    years: dto.filters.years,
    industries: dto.filters.industries,
    scales: dto.filters.scales
  },
  choropleth: dto.choropleth.map((item) => ({
    code: item.prefecture_code,
    name: item.prefecture_name,
    value: item.value
  }))
});

export const mapDetailDto = (dto: DetailEntryDto): CompanyDetail => ({
  prefecture: mapPrefecture({
    prefecture_code: dto.prefecture_code,
    prefecture_name: dto.prefecture_name,
    value: dto.industries.reduce((sum, item) => sum + item.value, 0)
  }),
  industries: dto.industries,
  scales: dto.scales,
  trend: dto.trend
});
