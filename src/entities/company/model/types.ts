export type PrefectureCode = string;

export interface CompanyFilters {
  year: string;
  industry: string;
  scale: string;
}

export interface CompanyFilterOption {
  value: string;
  label: string;
}

export interface CompanyFilterConfig {
  years: CompanyFilterOption[];
  industries: CompanyFilterOption[];
  scales: CompanyFilterOption[];
}

export interface PrefectureMetric {
  code: PrefectureCode;
  name: string;
  value: number;
}

export interface IndustryRankingItem {
  code: string;
  name: string;
  value: number;
}

export interface ScaleDistributionItem {
  scale: string;
  label: string;
  value: number;
}

export interface TrendItem {
  year: string;
  value: number;
}

export interface CompanyOverview {
  filters: CompanyFilterConfig;
  choropleth: PrefectureMetric[];
}

export interface CompanyDetail {
  prefecture: PrefectureMetric;
  industries: IndustryRankingItem[];
  scales: ScaleDistributionItem[];
  trend: TrendItem[];
}
