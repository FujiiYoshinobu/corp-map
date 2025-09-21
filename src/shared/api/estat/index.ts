import type {
  CompanyDetail,
  CompanyFilters,
  CompanyOverview,
  PrefectureCode
} from '@/entities/company';
import { mapDetailDto, mapOverviewDto } from './model/mapper';
import { DetailsResponseSchema, OverviewResponseSchema } from './model/schemas';

const ESTAT_ENDPOINT = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData';
const MOCK_OVERVIEW_PATH = '/mock/company-overview.json';
const MOCK_DETAILS_PATH = '/mock/company-details.json';

const isMock = () => typeof process !== 'undefined' && !process.env.ESTAT_APP_ID;

const buildQueryParams = (filters: CompanyFilters) => {
  const params = new URLSearchParams({
    appId: process.env.ESTAT_APP_ID ?? '',
    statsDataId: '00200521',
    limit: '100'
  });
  if (filters.year) params.set('cdTime', filters.year);
  if (filters.industry && filters.industry !== 'all') params.set('cdIndustry', filters.industry);
  if (filters.scale && filters.scale !== 'all') params.set('cdScale', filters.scale);
  return params.toString();
};

const fetchJson = async (input: string | URL, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Failed to fetch e-Stat data: ${response.status}`);
  }
  return response.json();
};

type MockModule<T> = { default: T };

const loadMockOverview = async () => {
  if (typeof window === 'undefined') {
    const module = (await import('../../../../public/mock/company-overview.json')) as MockModule<unknown>;
    return module.default;
  }
  return fetchJson(MOCK_OVERVIEW_PATH);
};

const loadMockDetails = async () => {
  if (typeof window === 'undefined') {
    const module = (await import('../../../../public/mock/company-details.json')) as MockModule<unknown>;
    return module.default;
  }
  return fetchJson(MOCK_DETAILS_PATH);
};

export const fetchCompanyOverview = async (
  filters: CompanyFilters
): Promise<CompanyOverview> => {
  const data = isMock()
    ? await loadMockOverview()
    : await fetchJson(`${ESTAT_ENDPOINT}?${buildQueryParams(filters)}`);

  const parsed = OverviewResponseSchema.parse(data);
  return mapOverviewDto(parsed);
};

export const fetchCompanyDetail = async (
  prefectureCode: PrefectureCode,
  filters: CompanyFilters
): Promise<CompanyDetail> => {
  const data = isMock()
    ? await loadMockDetails()
    : await fetchJson(`${ESTAT_ENDPOINT}?${buildQueryParams(filters)}&cdArea=${prefectureCode}`);

  const parsed = DetailsResponseSchema.parse(data);
  const entry = parsed[prefectureCode];
  if (!entry) {
    throw new Error(`Prefecture detail not found for code ${prefectureCode}`);
  }
  return mapDetailDto(entry);
};

export const EstatApi = {
  fetchCompanyOverview,
  fetchCompanyDetail
};
