// @flow
import D from 'date-fns/fp'

export type DateDefaultString = string

const getNow = () => new Date()

export const formatFullDate = D.format(`MMM D, YYYY`)

export const formatDate = (inputDate: DateDefaultString): string => {
  const now = getNow()
  const date = D.toDate(inputDate)
  const isCurrentYear = D.getYear(date) === now.getFullYear()
  return isCurrentYear ? D.format(`MMM D`, date) : D.format(`MMM D, YYYY`, date)
}

export const formatDateRange = (
  startDate: DateDefaultString,
  endDate: DateDefaultString,
  options: { short: boolean } = { short: false }
): string => {
  const { short = false } = options
  const MONTH = short ? 'MMM' : 'MMMM'
  const start = D.toDate(startDate)
  const end = endDate ? D.toDate(endDate) : start
  const now = getNow()
  const isSameCurrentYear = (a, b) =>
    D.isSameYear(a, b) && D.getYear(a) === now.getFullYear()

  if (D.isSameMonth(start, end)) {
    if (isSameCurrentYear(start, end)) {
      return `${D.format(`${MONTH}`, start)}`
    }
    return `${D.format(`${MONTH}, YYYY`, start)}`
  } else if (D.isSameYear(start, end)) {
    if (isSameCurrentYear(start, end)) {
      return `${D.format(`${MONTH}`, start)} – ${D.format(`${MONTH}`, end)}`
    }
    return `${D.format(`${MONTH}`, start)} – ${D.format(`${MONTH}, YYYY`, end)}`
  }
  return `${D.format(`${MONTH}, YYYY`, start)} – ${D.format(
    `${MONTH}, YYYY`,
    end
  )}`
}
