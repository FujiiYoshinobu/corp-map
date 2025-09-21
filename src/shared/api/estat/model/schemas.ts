import { z } from 'zod';

export const FilterOptionSchema = z.object({
  value: z.string(),
  label: z.string()
});

export const FiltersSchema = z.object({
  years: z.array(FilterOptionSchema),
  industries: z.array(FilterOptionSchema),
  scales: z.array(FilterOptionSchema)
});

export const ChoroplethItemSchema = z.object({
  prefecture_code: z.string(),
  prefecture_name: z.string(),
  value: z.number()
});

export const OverviewResponseSchema = z.object({
  filters: FiltersSchema,
  choropleth: z.array(ChoroplethItemSchema)
});

export const IndustryRankingItemSchema = z.object({
  code: z.string(),
  name: z.string(),
  value: z.number()
});

export const ScaleDistributionItemSchema = z.object({
  scale: z.string(),
  label: z.string(),
  value: z.number()
});

export const TrendItemSchema = z.object({
  year: z.string(),
  value: z.number()
});

export const DetailEntrySchema = z.object({
  prefecture_code: z.string(),
  prefecture_name: z.string(),
  total: z.number().optional(),
  industries: z.array(IndustryRankingItemSchema),
  scales: z.array(ScaleDistributionItemSchema),
  trend: z.array(TrendItemSchema)
});

export const DetailsResponseSchema = z.record(z.string(), DetailEntrySchema);
