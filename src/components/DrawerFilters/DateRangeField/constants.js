// @flow strict-local

export type DateRangeFilterValue =
  | 'all'
  | 'current_year'
  | 'prev_year'
  | 'last_12_months'
  | 'last_3_months'
  | 'current_month'
  | 'prev_month'
  | 'custom'

export const DATE_FILTER: { [string]: DateRangeFilterValue } = {
  allTime: 'all',
  currentYear: 'current_year',
  prevYear: 'prev_year',
  last12Months: 'last_12_months',
  last3Months: 'last_3_months',
  currentMonth: 'current_month',
  prevMonth: 'prev_month',
  custom: 'custom',
}
