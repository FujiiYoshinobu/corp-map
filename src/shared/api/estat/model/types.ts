import type {
  ChoroplethItemSchema,
  DetailEntrySchema,
  OverviewResponseSchema
} from './schemas';
import { z } from 'zod';

export type OverviewResponseDto = z.infer<typeof OverviewResponseSchema>;
export type ChoroplethItemDto = z.infer<typeof ChoroplethItemSchema>;
export type DetailEntryDto = z.infer<typeof DetailEntrySchema>;
