// @flow
import D from 'date-fns/fp'
import * as R from 'ramda'
import { padStart } from 'lodash'

export type DateString = string
export type DateTimeString = string
export type TimeString = string

const getNow = () => new Date()

export const HOUR24_TIME_FORMAT = 'HH:mm'
export const HOUR12_TIME_FORMAT = 'h:mm A'
export const MONTH_FORMAT = 'YYYY-MM'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_HOUR24_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

export const parseMonth = D.parse(new Date(), MONTH_FORMAT)
export const parseDate = D.parse(new Date(), DATE_FORMAT)
export const parseDateTime = D.parse(new Date(), DATE_HOUR24_TIME_FORMAT)
export const parse12HourTime = D.parse(new Date(), HOUR12_TIME_FORMAT)
export const parse24HourTime = D.parse(new Date(), HOUR24_TIME_FORMAT)

export const parseTimeToHoursMinutes = R.pipe(
  R.split(':'),
  R.map(parseInt)
)

export const parseList = R.curryN(2, (parser, list) => R.map(parser, list))

export const formatMonth = D.format(MONTH_FORMAT)
export const formatDate = D.format(DATE_FORMAT)
export const formatDateTime = D.format(DATE_HOUR24_TIME_FORMAT)
export const formatHour24Time = D.format(HOUR24_TIME_FORMAT)
export const formatHour12Time = D.format(HOUR12_TIME_FORMAT)

export const roundHour24Time = R.pipe(
  parse24HourTime,
  D.addHours(1),
  D.setMinutes(0),
  formatHour24Time
)

export const isHour12Format = R.test(
  /\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/
)
export const isHour24Format = R.test(/([01]\d|2[0-4]):([0-5]\d)/)

export const isCurrentYear = (date: Date) => {
  const now = getNow()
  return D.getYear(date) === now.getFullYear()
}

export const findClosestHour24TimeSlot = (list, time: TimeString) =>
  D.closestIndexTo(parseList(parse24HourTime, list), parse24HourTime(time))

export const fixHour12Time = R.pipe(
  parseTimeToHoursMinutes,
  R.apply((hours, minutes) => {
    if (isNaN(hours)) {
      return undefined
    }
    return `${hours}:${isNaN(minutes) ? '00' : padStart(minutes, 2, '0')} PM`
  })
)

export const formatUTC = (date: Date) => date.toISOString()
// backend format
export const serializeDate = (
  date: DateString | Date | number,
  time?: TimeString
) => {
  if (date instanceof Date || typeof date === 'number') {
    return `${formatDate(date)}T${formatHour24Time(date)}`
  }

  let inlineDate = date
  let inlineTime = time

  if (inlineTime === '24:00') {
    inlineDate = formatDate(D.addDays(1, parseDate(inlineDate)))
    inlineTime = '00:00'
  }

  return inlineTime ? `${inlineDate}T${inlineTime}` : inlineDate
}

export const formatDatesPeriodScope = (
  earliestDate: DateString,
  latestDate: DateString
): string => {
  const min = parseDate(earliestDate)
  const max = latestDate ? parseDate(latestDate) : parseDate(earliestDate)

  const isSameMonthAndYear = (first, last): boolean =>
    D.isSameYear(first, last) && D.isSameMonth(first, last)

  return R.cond([
    [
      (D.isSameDay: (a: Date, b: Date) => boolean),
      both =>
        `On ${D.format(
          `${isCurrentYear(both) ? 'MMMM D' : 'MMMM D YYYY'}`,
          both
        )}`,
    ],
    [
      isSameMonthAndYear,
      both =>
        `In ${D.format(`${isCurrentYear(both) ? 'MMMM' : 'MMMM YYYY'}`, both)}`,
    ],
    [
      (D.isSameYear: (a: Date, b: Date) => boolean),
      both => `In ${D.format(`YYYY`, both)}`,
    ],
    [
      R.T,
      (first, last) =>
        `In ${D.format(`YYYY`, first)}–${D.format(`YYYY`, last)}`,
    ],
  ])(min, max)
}

export const formatDateRange = (
  startDate: DateString,
  endDate: DateString,
  options: { short: boolean } = { short: false }
): string => {
  const { short = false } = options
  const MONTH = short ? 'MMM' : 'MMMM'
  const start = parseDate(startDate)
  const end = endDate ? parseDate(endDate) : start
  const now = getNow()
  const isSameCurrentYear = (a, b) =>
    D.isSameYear(a, b) && D.getYear(a) === now.getFullYear()

  if (D.isEqual(start, end)) {
    if (D.isSameYear(start, now)) {
      return D.format(`${MONTH} D`, start)
    }
    return D.format(`${MONTH} D, YYYY`, start)
  } else if (D.isSameMonth(start, end)) {
    if (isSameCurrentYear(start, end)) {
      return `${D.format(`${MONTH} D`, start)} – ${D.format('D', end)}`
    }
    return `${D.format(`${MONTH} D`, start)} – ${D.format('D, YYYY', end)}`
  } else if (D.isSameYear(start, end)) {
    if (isSameCurrentYear(start, end)) {
      return `${D.format('MMM D', start)} – ${D.format('MMM D', end)}`
    }
    return `${D.format('MMM D', start)} – ${D.format('MMM D, YYYY', end)}`
  }
  return `${D.format('MMM D, YYYY', start)} – ${D.format('MMM D, YYYY', end)}`
}

export const formatSameDayTimeRange = (
  startTime: TimeString,
  endTime: TimeString
): string => {
  if (
    R.isNil(startTime) ||
    R.isNil(endTime) ||
    startTime === '' ||
    endTime === ''
  ) {
    return 'All day'
  }
  const start = D.parse(getNow(), 'HH:mm', startTime)
  const end = D.parse(getNow(), 'HH:mm', endTime)
  return `${D.format('h:mm A', start)} – ${D.format('h:mm A', end)}`
}

export const formatTimeRange = (
  startTime: TimeString,
  endTime: TimeString,
  startDate: DateString,
  endDate: DateString
) => {
  if (
    R.isNil(startTime) ||
    R.isNil(endTime) ||
    startTime === '' ||
    endTime === ''
  ) {
    return 'All day'
  }

  if (D.isSameDay(startDate, endDate)) {
    const start = parseDateTime(`${startDate} ${startTime || ''}`)

    return `${D.format('ddd', start)}, ${formatSameDayTimeRange(
      startTime,
      endTime
    )}`
  }
  const start = parseDateTime(`${startDate} ${startTime}`)
  const end = parseDateTime(`${endDate} ${endTime}`)

  return `${D.format('ddd, h:mm A', start)} – ${D.format('ddd, h:mm A', end)}`
}

export const formatNumberHour24 = (hours: number, minutes: number = 0) => {
  const formattedHours = padStart(hours, 2, '0')
  const formattedMinutes = padStart(minutes, 2, '0')

  return `${formattedHours}:${formattedMinutes}`
}

export const formatHour24FromMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const leftMinutes = minutes - hours * 60
  return formatNumberHour24(hours, leftMinutes)
}

export const formatHour24FromHour12 = (time: string) =>
  formatHour24Time(parse12HourTime(time))

export const formatHour12FromHour24 = (time: TimeString) =>
  formatHour12Time(parse24HourTime(time))

export const timeToMinutes = R.pipe(
  parseTimeToHoursMinutes,
  R.apply((h, m) => h * 60 + m)
)

export const formatNumberHourUS = (time: string) => {
  const parseTime = parseTimeToHoursMinutes(time)
  const hours = parseTime[0]
  const minutes = parseTime[1]

  if (hours === 12 && minutes === 0) {
    return '12 noon'
  } else if (hours === 24) {
    return '12 midnight'
  }

  return D.format('h:mm A', D.setHours(hours, D.setMinutes(minutes, getNow())))
}

export const isPast = (date: Date, now: Date = getNow()) =>
  D.isBefore(now, date)
export const isUpcoming = (date: Date, now: Date = getNow()) =>
  D.isAfter(now, date)
export const isBetween = R.curryN(
  3,
  (from: Date, to: Date, date: Date) =>
    D.isAfter(from, date) && D.isBefore(to, date)
)

export const addTimeMinutes = (minutes: number) =>
  R.pipe(
    timeToMinutes,
    R.add(minutes),
    R.max(0),
    R.min(24 * 60),
    formatHour24FromMinutes
  )

export const getTimeFromISODate = (isoDate: string) => isoDate.slice(11, 16)
export const getDateFromISODate = (isoDate: string) => isoDate.slice(0, 10)

export const diffHours = (
  startDate: DateString,
  endDate: DateString,
  startTime: TimeString,
  endTime: TimeString
) =>
  D.differenceInHours(
    parseDateTime(`${startDate} ${startTime}`),
    parseDateTime(`${endDate} ${endTime}`)
  )
