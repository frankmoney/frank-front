// @flow strict
import * as R from 'ramda'
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

export type JSONString = string

type BarItem = {|
  date: JSONString,
  negativeValue?: number,
  value: number,
|}

export type BarData = Array<BarItem>

const convertToBarChartValues = ({
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

type BarsUnit = 'day' | 'week' | 'month' | 'quarter' | 'year'

const formatBarAxisLabel = (
  date: Date,
  prev: ?Date,
  barsUnit: BarsUnit
): string => {
  let formatter = 'DD' // barsUnit == 'day'
  if (barsUnit === 'week') {
    formatter = !prev || (prev && !isSameMonth(date, prev)) ? 'MMM' : ''
  } else if (barsUnit === 'month') {
    formatter = prev && !isSameYear(date, prev) ? 'MMM YYYY' : 'MMM'
  } else if (barsUnit === 'quarter') {
    formatter =
      !prev || (prev && !isSameYear(date, prev)) ? '[Q]Q YYYY' : '[Q]Q'
  } else if (barsUnit === 'year') {
    formatter = 'YYYY'
  }
  return format(formatter, date)
}

const formatBarTooltipLabel = (date: Date, barsUnit: BarsUnit): string => {
  let formatter = 'MMMM DD, YYYY' // barsUnit == 'day'
  if (barsUnit === 'week') {
    const endDate = endOfWeek(date)
    if (isSameMonth(date, endDate)) {
      // January 1–6, 2017
      return format(`MMMM DD–[${format('DD', endDate)}], YYYY`, date)
    }
    // Mar 27 – Apr 2, 2017
    return format(`MMM DD – [${format('MMM DD', endDate)}], YYYY`, date)
  } else if (barsUnit === 'month') {
    formatter = 'MMMM YYYY'
  } else if (barsUnit === 'quarter') {
    formatter = '[Q]Q YYYY'
  } else if (barsUnit === 'year') {
    formatter = 'YYYY'
  }
  return format(formatter, date)
}

const formatBarLabels = (
  item: IntermediateDataPoint,
  prev: ?IntermediateDataPoint,
  barsUnit: BarsUnit
): FormattedBarLabels => {
  const date = parseDate(item.showDate)
  const prevDate = prev ? parseDate(prev.showDate) : null
  return {
    startDate: item.startDate,
    endDate: item.endDate,
    axisLabel: formatBarAxisLabel(date, prevDate, barsUnit),
    tooltipLabel: formatBarTooltipLabel(date, barsUnit),
  }
}

type FormatItemsFn = (Array<BarsDataPoint>, BarsUnit) => BarData

export const formatBarDataPoints: FormatItemsFn = (data, barsUnit) =>
  R.pipe(
    R.map(convertToBarChartValues),
    list =>
      list.reduce((acc, item: IntermediateDataPoint, idx) => {
        const prev = idx > 0 ? list[idx - 1] : null
        return R.append(
          {
            ...item.values,
            date: JSON.stringify(formatBarLabels(item, prev, barsUnit)),
          },
          acc
        )
      }, [])
  )(data)

export const positiveBarValues = R.map(({ date, value }: BarItem) => ({
  date,
  value,
}))

export const negativeBarValues = R.map(({ date, negativeValue }: BarItem) => ({
  date,
  value: negativeValue,
}))
