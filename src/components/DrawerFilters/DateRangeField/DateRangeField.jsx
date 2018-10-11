import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { DateSelect, CheckedMenuItem } from '@frankmoney/components'
import * as D from 'date-fns'
import DrawerField from 'components/DrawerField'
import SelectField from 'components/SelectField'
import { DATE_FILTER } from './constants'

const styles = {
  customDatesWrap: {
    marginTop: 30,
    display: 'flex',
    width: 400,
  },
  customDateSelect: {
    flex: 1,
    '&:first-child': {
      marginRight: 10,
    },
  },
}

const DateRangeField = ({
  classes,
  from,
  to,
  now = new Date(),
  startDate = D.startOfYear(new Date()),
  onChange,
}) => {
  const currentYear = D.startOfYear(now)
  const prevYear = D.startOfYear(D.subYears(now, 1))
  const last12Months = D.startOfMonth(D.subMonths(now, 11))
  const last3Months = D.startOfMonth(D.subMonths(now, 2))
  const currentMonth = D.startOfMonth(now)
  const prevMonth = D.startOfMonth(D.subMonths(now, 1))

  const formatFilterValue = value => {
    switch (value) {
      case DATE_FILTER.currentYear:
        return { from: currentYear }
      case DATE_FILTER.prevYear:
        return { from: prevYear, to: currentYear }
      case DATE_FILTER.last12Months:
        return { from: last12Months }
      case DATE_FILTER.last3Months:
        return { from: last3Months }
      case DATE_FILTER.currentMonth:
        return { from: currentMonth }
      case DATE_FILTER.prevMonth:
        return { from: prevMonth, to: currentMonth }
      case DATE_FILTER.custom:
        return { from: from ? D.addHours(from, 1) : now, to }
      default:
        return { from: null, to: null }
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

  console.log({ from, to, now })

  return (
    <DrawerField title="Date range">
      <SelectField
        value={filterValue}
        fullWidth
        onChange={({ target }) => onChange(formatFilterValue(target.value))}
      >
        <CheckedMenuItem value={DATE_FILTER.allTime}>All</CheckedMenuItem>
        <CheckedMenuItem value={DATE_FILTER.currentYear}>
          {D.format(now, 'YYYY')}
        </CheckedMenuItem>
        {startDate < currentYear && (
          <CheckedMenuItem value={DATE_FILTER.prevYear}>
            {D.format(prevYear, 'YYYY')}
          </CheckedMenuItem>
        )}
        <CheckedMenuItem value={DATE_FILTER.last12Months}>
          Last 12 months
        </CheckedMenuItem>
        <CheckedMenuItem value={DATE_FILTER.last3Months}>
          Last 3 months
        </CheckedMenuItem>
        <CheckedMenuItem value={DATE_FILTER.currentMonth}>
          {D.format(currentMonth, 'MMMM YYYY')}
        </CheckedMenuItem>
        {startDate < currentMonth && (
          <CheckedMenuItem value={DATE_FILTER.prevMonth}>
            {D.format(prevMonth, 'MMMM YYYY')}
          </CheckedMenuItem>
        )}
        <CheckedMenuItem value={DATE_FILTER.custom}>
          Custom range
        </CheckedMenuItem>
      </SelectField>
      {filterValue === DATE_FILTER.custom && (
        <div className={classes.customDatesWrap}>
          <DateSelect
            className={classes.customDateSelect}
            format="ddd, M/DD/YYYY"
            value={from}
            onChange={value => onChange({ from: value, to })}
          />
          <DateSelect
            className={classes.customDateSelect}
            format="ddd, M/DD/YYYY"
            value={to}
            onChange={value => onChange({ from, to: value })}
          />
        </div>
      )}
    </DrawerField>
  )
}

export default injectStyles(styles)(DateRangeField)
