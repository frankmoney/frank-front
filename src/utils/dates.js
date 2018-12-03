// @flow strict
import D from 'date-fns/fp'
import * as R from 'ramda'
import { padStart } from 'lodash'

export type DateString = string
export type DateRange = Array<DateString>
export type DateTimeString = string
export type TimeString = string

const getNow = () => new Date()

export const HOUR24_TIME_FORMAT = 'HH:mm'
export const HOUR12_TIME_FORMAT = 'h:mm A'
export const MONTH_FORMAT = 'YYYY-MM'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_HOUR24_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

// ACTUALLY IN USE ( START )

export const ONLY_MONTH_FORMAT = 'MMMM'
export const SHORT_DATE_FORMAT = 'MMM DD'
export const FULL_DATE_FORMAT = 'MMMM DD'
export const YEAR_FORMAT = 'YYYY'

// ACTUALLY IN USE ( END )

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

// ACTUALLY IN USE ( START )

type FormatFn = (date: Date, ?boolean) => string

export const formatMonthDate: FormatFn = (date, withYear = false) =>
  D.format(
    withYear ? `${ONLY_MONTH_FORMAT} ${YEAR_FORMAT}` : ONLY_MONTH_FORMAT,
    date
  )
export const formatShortDate: FormatFn = (date, withYear = false) =>
  D.format(
    withYear ? `${SHORT_DATE_FORMAT}, ${YEAR_FORMAT}` : SHORT_DATE_FORMAT,
    date
  )
export const formatFullDate: FormatFn = (date, withYear = false) =>
  D.format(
    withYear ? `${FULL_DATE_FORMAT}, ${YEAR_FORMAT}` : FULL_DATE_FORMAT,
    date
  )

// ACTUALLY IN USE ( END )

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

export const findClosestHour24TimeSlot = (
  list: Array<TimeString>,
  time: TimeString
) => D.closestIndexTo(parseList(parse24HourTime, list), parse24HourTime(time))

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

const isWholeYearsBetweenDates = (startDate, endDate): boolean =>
  D.getMonth(startDate) === 0 &&
  D.getMonth(endDate) === 11 &&
  (D.differenceInMonths(startDate, endDate) === 11 ||
    D.differenceInMonths(startDate, endDate) %
      (11 + 12 * D.differenceInYears(startDate, endDate)) ===
      0)

type FormatDateRangeOptions = {|
  short?: boolean,
  withDay?: boolean,
|}

type FormatDateRangeFn = (
  startDate: DateString,
  endDate: DateString,
  options: FormatDateRangeOptions
) => string

export const formatDateRange: FormatDateRangeFn = (
  startDate,
  endDate,
  options = {}
) => {
  const { short = true, withDay = false } = options
  const MONTH = short ? 'MMM' : 'MMMM'
  const DAY = withDay ? ' D' : ''
  const MONTHDAY = MONTH + DAY
  const start = parseDate(startDate)
  const end = endDate ? parseDate(endDate) : start

  if (D.isEqual(start, end)) {
    return D.format(`${MONTHDAY}, YYYY`, start)
  } else if (D.isSameMonth(start, end)) {
    return withDay
      ? `${D.format(`${MONTHDAY} `, start)}–${D.format(`${DAY}, YYYY`, end)}`
      : `${D.format(`${MONTHDAY}, YYYY`, end)}`
  } else if (D.isSameYear(start, end)) {
    if (!withDay && isWholeYearsBetweenDates(start, end)) {
      return `${D.format('YYYY', start)}`
    }
    return `${D.format(`${MONTHDAY} `, start)}–${D.format(
      ` ${MONTHDAY}, YYYY`,
      end
    )}`
  } else if (!withDay && isWholeYearsBetweenDates(start, end)) {
    return `${D.format(`YYYY`, start)} – ${D.format(`YYYY`, end)}`
  }
  return `${D.format(`${MONTHDAY}, YYYY`, start)} – ${D.format(
    `${MONTHDAY}, YYYY`,
    end
  )}`
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
