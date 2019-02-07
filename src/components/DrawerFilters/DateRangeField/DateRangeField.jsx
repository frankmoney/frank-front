// @flow strict-local
import React from 'react'
import * as D from 'date-fns'
import { MenuItem } from 'components/kit/Menu'
import { MonthSelect, type DateString } from 'components/kit/DateSelect'
import Drawer from 'components/kit/Drawer'
import SelectField from 'components/kit/SelectField'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { DATE_FILTER, type DateRangeFilterValue } from './constants'

const styles = {
  customDatesWrap: {
    marginTop: 28,
    display: 'flex',
  },
  customDateSelect: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    '&:first-child': {
      marginRight: 20,
    },
  },
  customDateMonth: {
    marginRight: 15,
    width: 'auto',
    flex: [1, 1],
  },
  customDateYear: {
    flex: [0, 0],
  },
}

export type DateRangeValue = {|
  from?: DateString,
  to?: DateString,
|}

type Props = {|
  ...InjectStylesProps,
  //
  from?: DateString,
  now: Date,
  onChange: DateRangeValue => void,
  startDate: Date,
  to?: DateString,
|}

const DateRangeField = ({
  classes,
  from,
  now = new Date(),
  onChange,
  startDate = D.startOfYear(new Date()),
  to,
  ...otherProps
}: Props) => {
  const currentYear = D.startOfYear(now)
  const prevYear = D.startOfYear(D.subYears(now, 1))
  const prevYearEnd = D.endOfYear(prevYear)
  const last12Months = D.startOfMonth(D.subMonths(now, 11))
  const last3Months = D.startOfMonth(D.subMonths(now, 2))
  const currentMonth = D.startOfMonth(now)
  const prevMonth = D.startOfMonth(D.subMonths(now, 1))
  const prevMonthEnd = D.endOfMonth(prevMonth)

  const formatFilterValue = (value: DateRangeFilterValue): DateRangeValue => {
    switch (value) {
      case DATE_FILTER.currentYear:
        return { from: currentYear }
      case DATE_FILTER.prevYear:
        return { from: prevYear, to: prevYearEnd }
      case DATE_FILTER.last12Months:
        return { from: last12Months }
      case DATE_FILTER.last3Months:
        return { from: last3Months }
      case DATE_FILTER.currentMonth:
        return { from: currentMonth }
      case DATE_FILTER.prevMonth:
        return { from: prevMonth, to: prevMonthEnd }
      case DATE_FILTER.custom:
        return { from: from ? D.addHours(from, 1) : now, to }
      default:
        return ({}: Object) // flowlint-line unclear-type:off
    }
  }

  let filterValue = 'all'
  if (from || to) {
    if (from && !to && from.valueOf() === currentYear.valueOf()) {
      filterValue = DATE_FILTER.currentYear
    } else if (
      from &&
      to &&
      from.valueOf() === prevYear.valueOf() &&
      to.valueOf() === currentYear.valueOf()
    ) {
      filterValue = DATE_FILTER.prevYear
    } else if (from && !to && from.valueOf() === last12Months.valueOf()) {
      filterValue = DATE_FILTER.last12Months
    } else if (from && !to && from.valueOf() === last3Months.valueOf()) {
      filterValue = DATE_FILTER.last3Months
    } else if (from && !to && from.valueOf() === currentMonth.valueOf()) {
      filterValue = DATE_FILTER.currentMonth
    } else if (
      from &&
      to &&
      from.valueOf() === prevMonth.valueOf() &&
      to.valueOf() === currentMonth.valueOf()
    ) {
      filterValue = DATE_FILTER.prevMonth
    } else {
      filterValue = DATE_FILTER.custom
    }
  }

  return (
    <Drawer.Field {...otherProps}>
      <SelectField
        value={filterValue}
        stretch
        onChange={v => onChange(formatFilterValue(v))}
      >
        <MenuItem value={DATE_FILTER.allTime} label="All" />
        <MenuItem
          value={DATE_FILTER.currentYear}
          label={D.format(now, 'YYYY')}
        />
        {startDate < currentYear && (
          <MenuItem
            value={DATE_FILTER.prevYear}
            label={D.format(prevYear, 'YYYY')}
          />
        )}
        {startDate <= last12Months && (
          <MenuItem value={DATE_FILTER.last12Months} label="Last 12 months" />
        )}
        {startDate <= last3Months && (
          <MenuItem value={DATE_FILTER.last3Months} label="Last 3 months" />
        )}
        <MenuItem
          value={DATE_FILTER.currentMonth}
          label={D.format(currentMonth, 'MMMM YYYY')}
        />
        {startDate < currentMonth && (
          <MenuItem
            value={DATE_FILTER.prevMonth}
            label={D.format(prevMonth, 'MMMM YYYY')}
          />
        )}
        <MenuItem value={DATE_FILTER.custom} label="Custom range" />
      </SelectField>
      {filterValue === DATE_FILTER.custom && (
        <div className={classes.customDatesWrap}>
          <MonthSelect
            className={classes.customDateSelect}
            monthFormat="MMM"
            monthClassName={classes.customDateMonth}
            yearClassName={classes.customDateYear}
            label="From"
            value={from}
            onChange={value => onChange({ from: value, to })}
          />
          <MonthSelect
            className={classes.customDateSelect}
            monthFormat="MMM"
            monthClassName={classes.customDateMonth}
            yearClassName={classes.customDateYear}
            label="To"
            value={to}
            yearSelectProps={{ align: 'end' }}
            onChange={value =>
              onChange({ from, to: value && D.lastDayOfMonth(value) })
            }
          />
        </div>
      )}
    </Drawer.Field>
  )
}

export default injectStyles(styles)(DateRangeField)
