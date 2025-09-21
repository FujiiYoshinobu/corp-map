import { registerTheme } from 'echarts/core';
import { corpMapTheme } from './echarts-theme';

const THEME_NAME = 'corp-map-dark';
let registered = false;

export const ensureEChartsTheme = () => {
  if (!registered) {
    registerTheme(THEME_NAME, corpMapTheme);
    registered = true;
  }
  return THEME_NAME;
};
