// @flow strict
import { endOfWeek, format, isSameMonth, isSameYear } from 'date-fns/fp'
import { parseDate } from 'utils/dates'

type ApiDates = {|
  endDate: string,
  showDate: string,
  startDate: string,
|}

export type BarsDataPoint = {|
  ...ApiDates,
  revenue: number,
  spending: number,
|}

type IntermediateDataPoint = {|
  ...ApiDates,
  values: {
    negativeValue: number,
    value: number,
  },
|}

export type FormattedBarLabels = {|
  axisLabel: string,
  tooltipLabel: string,
  // zoom-in intervals
  endDate: string,
  startDate: string,
|}

export const convertToBarChartValues = ({
  endDate,
  revenue,
  showDate,
  spending,
  startDate,
}: BarsDataPoint): IntermediateDataPoint => ({
  endDate,
  showDate,
  startDate,
  values: {
    value: Math.floor(revenue),
    negativeValue: Math.floor(spending),
  },
})

export type BarsSize = 'day' | 'week' | 'month' | 'quarter' | 'year'

const formatBarAxisLabel = (
  date: Date,
  prev: ?Date,
  barsSize: BarsSize
): string => {
  let formatter = 'DD' // barsSize == 'day'
  if (barsSize === 'week') {
    formatter = prev && !isSameMonth(date, prev) ? 'MMM' : ''
  } else if (barsSize === 'month') {
    formatter = prev && !isSameYear(date, prev) ? 'MMM YYYY' : 'MMM'
  } else if (barsSize === 'quarter') {
    formatter = prev && !isSameYear(date, prev) ? '[Q]Q YYYY' : '[Q]Q'
  } else if (barsSize === 'year') {
    formatter = 'YYYY'
  }
  return format(formatter, date)
}

const formatBarTooltipLabel = (date: Date, barsSize: BarsSize): string => {
  let formatter = 'MMMM DD, YYYY' // barsSize == 'day'
  if (barsSize === 'week') {
    const endDate = endOfWeek(date)
    if (isSameMonth(date, endDate)) {
      // January 1–6, 2017
      return format(`MMMM DD–[${format('DD', endDate)}], YYYY`, date)
    }
    // Mar 27 – Apr 2, 2017
    return format(`MMM DD – [${format('MMM DD', endDate)}], YYYY`, date)
  } else if (barsSize === 'month') {
    formatter = 'MMMM YYYY'
  } else if (barsSize === 'quarter') {
    formatter = '[Q]Q YYYY'
  } else if (barsSize === 'year') {
    formatter = 'YYYY'
  }
  return format(formatter, date)
}

export const formatBarLabels = (
  item: IntermediateDataPoint,
  prevDate: ?Date,
  barsSize: BarsSize
): FormattedBarLabels => {
  const date = parseDate(item.showDate)
  return {
    startDate: item.startDate,
    endDate: item.endDate,
    axisLabel: formatBarAxisLabel(date, prevDate, barsSize),
    tooltipLabel: formatBarTooltipLabel(date, barsSize),
  }
}
