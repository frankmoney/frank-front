// @flow strict-local
import * as React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import * as D from 'date-fns'
import MenuItem from 'components/kit/Menu/MenuItem'
import SelectField from 'components/kit/SelectField'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  root: {},
  month: {
    width: 125,
    marginRight: 12,
  },
  year: {
    width: 75,
  },
}

type Value = Date

type Props = {|
  ...InjectStylesProps,
  //
  label?: string,
  maxDate: Date,
  minDate: Date,
  monthPlaceholder?: string,
  onChange?: Value => void,
  useEndOfTheMonth?: boolean,
  value?: Value,
  yearPlaceholder?: string,
|}

type State = {|
  month: ?number,
  year: ?number,
|}

const now: Date = new Date()

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const formatMonth = m => D.format(new Date(0, m), 'MMMM')

const yearsBetween = (start: Date, end: Date) =>
  R.range(D.getYear(start), D.getYear(end) + 1)

class MonthSelect extends React.Component<Props, State> {
  static defaultProps = {
    maxDate: D.addYears(now, 2),
    minDate: D.subYears(now, 10),
    monthPlaceholer: 'Month',
    yearPlaceholer: 'Year',
  }

  state = {
    month: this.props.value ? D.getMonth(this.props.value) : null,
    year: this.props.value ? D.getYear(this.props.value) : null,
  }

  // flowlint-next-line unsafe-getters-setters:off
  get compositeValue(): ?Date {
    if (
      typeof this.state.year === 'number' &&
      typeof this.state.month === 'number'
    ) {
      const date = new Date(this.state.year, this.state.month, 1)
      return this.props.useEndOfTheMonth ? D.lastDayOfMonth(date) : date
    }
    return null
  }

  handleChange() {
    if (this.props.onChange) {
      const value = this.compositeValue
      if (value) {
        this.props.onChange(value)
      }
    }
  }

  handleMonthChange = (value: number) => {
    this.setState({ month: value }, this.handleChange)
  }

  handleYearChange = (value: number) => {
    this.setState({ year: value }, this.handleChange)
  }

  render() {
    const {
      classes,
      className,
      label,
      maxDate,
      minDate,
      monthPlaceholder,
      yearPlaceholder,
    } = this.props
    const years = yearsBetween(minDate, maxDate)

    return (
      <div className={cx(classes.root, className)}>
        <SelectField
          className={classes.month}
          dropdownWidth={140}
          label={label}
          onChange={this.handleMonthChange}
          placeholder={monthPlaceholder}
          stretchDropdown
          value={this.state.month}
        >
          {R.map(
            month => (
              <MenuItem
                value={month}
                label={formatMonth(month)}
                key={`month-${month}`}
              />
            ),
            months
          )}
        </SelectField>
        <SelectField
          className={classes.year}
          dropdownWidth={110}
          onChange={this.handleYearChange}
          placeholder={yearPlaceholder}
          stretchDropdown
          value={this.state.year}
        >
          {R.map(
            year => (
              <MenuItem value={year} label={`${year}`} key={`year-${year}`} />
            ),
            years
          )}
        </SelectField>
      </div>
    )
  }
}

export default injectStyles(styles)(MonthSelect)
