import type { StoryDefinition } from '@/shared/lib/storybook/types';
import { storyDefinitions as filterStories } from '@/features/filter-companies/ui/FilterPanel.stories';
import { storyDefinitions as mapStories } from '@/widgets/map-panel/ui/MapPanel.stories';
import { storyDefinitions as detailStories } from '@/widgets/detail-panel/ui/DetailPanel.stories';

export const storyRegistry: StoryDefinition[] = [
  ...filterStories,
  ...mapStories,
  ...detailStories
];
