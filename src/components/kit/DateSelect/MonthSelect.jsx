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
  month: ?number,
  year: ?number,
|}

const now: Date = new Date()

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const yearsBetween = (start: Date, end: Date) =>
  R.range(D.getYear(start), D.getYear(end) + 1)

const getStateFromDate = (value: ?Value): State => ({
  month: value ? D.getMonth(value) : null,
  year: value ? D.getYear(value) : null,
})

const formatMonth = R.curry(
  (format: string, month: number): string =>
    D.format(new Date(1970, month), format)
)

class MonthSelect extends React.Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  static defaultProps = {
    monthFormat: 'MMMM',
    monthPlaceholder: 'Month',
    yearPlaceholder: 'Year',
    reverseYears: true,
    defaultValue: null,
    menuProps: { maxVisibleItems: 5 },
  }

  state = getStateFromDate(this.props.value || this.props.defaultValue)

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState(getStateFromDate(nextProps.value))
    }
  }

  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  get value() {
    return this.isControlled ? this.props.value : this.getValueFromState()
  }

  get maxDate(): Date {
    return (
      this.props.maxDate ||
      D.endOfYear(this.value ? D.max([now, this.value]) : now)
    )
  }

  get minDate(): Date {
    const defaultMin = D.subYears(now, 10)
    return (
      this.props.maxDate ||
      D.endOfYear(this.value ? D.min([defaultMin, this.value]) : defaultMin)
    )
  }

  get years(): Array<number> {
    const years = yearsBetween(this.minDate, this.maxDate)
    return this.props.reverseYears ? R.reverse(years) : years
  }

  getValueFromState(state = this.state): ?Date {
    if (typeof state.year === 'number' && typeof state.month === 'number') {
      const date = new Date(state.year, state.month, 1)

      return date
    }
    return null
  }

  handleChange() {
    if (this.props.onChange) {
      this.props.onChange(this.getValueFromState())
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
      menuProps,
    } = this.props

    const { month, year } = this.state

    return (
      <div className={cx(classes.root, className)}>
        <SelectField
          className={cx(classes.month, monthClassName)}
          dropdownWidth={140}
          label={label}
          onChange={this.handleMonthChange}
          placeholder={monthPlaceholder}
          formatValue={formatMonth(monthFormat)}
          value={month}
          menuProps={menuProps}
        >
          {R.map(
            m => (
              <MenuItem
                value={m}
                label={formatMonth(monthFormat, m)}
                key={`month-${m}`}
              />
            ),
            MONTHS
          )}
        </SelectField>
        <SelectField
          className={cx(classes.year, yearClassName)}
          dropdownWidth={110}
          onChange={this.handleYearChange}
          placeholder={yearPlaceholder}
          value={year}
          menuProps={menuProps}
        >
          {R.map(
            y => <MenuItem value={y} label={y} key={`year-${y}`} />,
            this.years
          )}
        </SelectField>
      </div>
    )
  }
}

export default injectStyles(styles)(MonthSelect)
