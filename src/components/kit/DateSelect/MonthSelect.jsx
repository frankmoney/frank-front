// @flow strict-local
// flowlint unsafe-getters-setters:off
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
    width: 76,
  },
}

type Value = Date

type Props = {|
  ...InjectStylesProps,
  //
  defaultValue?: Value,
  label?: string,
  maxDate?: Date,
  minDate?: Date,
  monthFormat: string,
  monthPlaceholder?: string,
  onChange?: Value => void,
  reverseYears?: boolean,
  useEndOfTheMonth?: boolean,
  value?: Value,
  yearPlaceholder?: string,
  //
  monthClassName?: string,
  yearClassName?: string,
|}

type State = {|
  isUncontrolled?: boolean,
  value: ?Value,
  month: ?number,
  year: ?number,
|}

const now: Date = new Date()

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const yearsBetween = (start: Date, end: Date) =>
  R.range(D.getYear(start), D.getYear(end) + 1)

const deriveMonthFromValue = (value: ?Value): ?number =>
  value ? D.getMonth(value) : null

const deriveYearFromValue = (value: ?Value): ?number =>
  value ? D.getYear(value) : null

const deriveStateFromValue = (value: ?Value): State => ({
  value,
  month: deriveMonthFromValue(value),
  year: deriveYearFromValue(value),
})

class MonthSelect extends React.Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  static defaultProps = {
    monthFormat: 'MMMM',
    monthPlaceholder: 'Month',
    yearPlaceholder: 'Year',
    reverseYears: true,
  }

  // state needs to be initialized or it would be null in getDerivedStateFromProps
  state = {
    isUncontrolled: false,
    value: null,
    month: null,
    year: null,
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isUncontrolled) {
      return null
    }
    // set up once from defaultValue
    if (!R.isNil(props.defaultValue)) {
      return {
        isUncontrolled: true,
        ...deriveStateFromValue(props.defaultValue),
      }
    }
    // check on every props/state change
    if (props.value !== state.value) {
      return deriveStateFromValue(props.value)
    }
    return null
  }

  get maxDate(): Date {
    return (
      this.props.maxDate ||
      D.endOfYear(this.props.value ? D.max([now, this.props.value]) : now)
    )
  }

  get minDate(): Date {
    const defaultMin = D.subYears(now, 10)
    return (
      this.props.maxDate ||
      D.endOfYear(
        this.props.value ? D.min([defaultMin, this.props.value]) : defaultMin
      )
    )
  }

  get years(): Array<number> {
    const years = yearsBetween(this.minDate, this.maxDate)
    return this.props.reverseYears ? R.reverse(years) : years
  }

  get month(): ?number {
    return this.state.month
  }

  get year(): ?number {
    return this.state.year
  }

  compositeValue(year, month): ?Date {
    if (typeof year === 'number' && typeof month === 'number') {
      const date = new Date(year, month, 1)
      return this.props.useEndOfTheMonth ? D.lastDayOfMonth(date) : date
    }
    return null
  }

  formatMonth = R.curry(
    (format: string, month: number): string =>
      D.format(new Date(1970, month), format)
  )

  handleChange() {
    const value = this.compositeValue(this.year, this.month)
    if (this.props.onChange && value) {
      this.props.onChange(value)
    }
  }

  handleMonthChange = (month: number) => {
    this.setState({ month }, this.handleChange)
  }

  handleYearChange = (year: number) => {
    this.setState({ year }, this.handleChange)
  }

  render() {
    const {
      classes,
      className,
      label,
      monthClassName,
      monthFormat,
      monthPlaceholder,
      yearClassName,
      yearPlaceholder,
    } = this.props

    return (
      <div className={cx(classes.root, className)}>
        <SelectField
          className={cx(classes.month, monthClassName)}
          dropdownWidth={140}
          label={label}
          onChange={this.handleMonthChange}
          placeholder={monthPlaceholder}
          formatValue={this.formatMonth(monthFormat)}
          value={this.month}
        >
          {R.map(
            month => (
              <MenuItem
                value={month}
                label={this.formatMonth('MMMM', month)}
                key={`month-${month}`}
              />
            ),
            months
          )}
        </SelectField>
        <SelectField
          className={cx(classes.year, yearClassName)}
          dropdownWidth={110}
          onChange={this.handleYearChange}
          placeholder={yearPlaceholder}
          value={this.year}
        >
          {R.map(
            year => (
              <MenuItem value={year} label={`${year}`} key={`year-${year}`} />
            ),
            this.years
          )}
        </SelectField>
      </div>
    )
  }
}

export default injectStyles(styles)(MonthSelect)
