import { BarChart, LineChart, MapChart, PieChart } from 'echarts/charts';
import {
  DatasetComponent,
  GeoComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components';
import type { ECharts } from 'echarts/core';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

let registered = false;

export const ensureECharts = () => {
  if (!registered) {
    use([
      TooltipComponent,
      VisualMapComponent,
      GeoComponent,
      MapChart,
      CanvasRenderer,
      LegendComponent,
      BarChart,
      PieChart,
      LineChart,
      GridComponent,
      DatasetComponent,
      TitleComponent,
      ToolboxComponent
    ]);
    registered = true;
  }
};

export type { ECharts };
