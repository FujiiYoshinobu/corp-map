import type { ReactNode } from 'react';

export interface StoryDefinition {
  id: string;
  title: string;
  group: string;
  render: () => ReactNode;
}
