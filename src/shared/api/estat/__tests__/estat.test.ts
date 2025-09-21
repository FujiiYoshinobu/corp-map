import { describe, expect, it } from 'vitest';
import overview from '../../../../../public/mock/company-overview.json';
import details from '../../../../../public/mock/company-details.json';
import { mapDetailDto, mapOverviewDto } from '../model/mapper';
import { DetailsResponseSchema, OverviewResponseSchema } from '../model/schemas';

describe('e-Stat mock data schema', () => {
  it('validates and maps overview response', () => {
    const parsed = OverviewResponseSchema.parse(overview);
    const overviewData = mapOverviewDto(parsed);
    expect(overviewData.choropleth.length).toBeGreaterThan(0);
    expect(overviewData.filters.years[0]).toHaveProperty('value');
  });

  it('validates and maps detail response', () => {
    const parsed = DetailsResponseSchema.parse(details);
    const firstKey = Object.keys(parsed)[0];
    const dto = parsed[firstKey];
    const detail = mapDetailDto(dto);
    expect(detail.prefecture.code).toBe(dto.prefecture_code);
    expect(detail.industries.length).toBeGreaterThan(0);
  });
});
