import type { ThemeOption } from 'echarts';

export const corpMapTheme: ThemeOption = {
  color: ['#38bdf8', '#8b5cf6', '#f97316', '#22c55e', '#facc15'],
  backgroundColor: 'transparent',
  textStyle: {
    color: '#e2e8f0',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  title: {
    textStyle: {
      color: '#e2e8f0'
    },
    subtextStyle: {
      color: '#94a3b8'
    }
  },
  tooltip: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderColor: '#38bdf8',
    textStyle: {
      color: '#f8fafc'
    }
  },
  visualMap: {
    textStyle: {
      color: '#cbd5f5'
    }
  },
  legend: {
    textStyle: {
      color: '#94a3b8'
    }
  }
};
