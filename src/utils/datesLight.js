// @flow strict
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
