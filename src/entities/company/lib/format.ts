export const formatCompanyCount = (value: number) =>
  new Intl.NumberFormat('ja-JP').format(value);

export const formatPercentage = (value: number) =>
  `${value.toFixed(1)}%`;
