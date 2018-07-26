import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import Bar, {
  POSITIVE_BAR_COLOR,
  PRIMARY_BAR_COLOR,
} from 'components/Charts/Bar'
import Checkbox from './Checkbox'

const MAX_ZEROES_TO_HIDE = 0.5

const styles = theme => ({
  chart: {},
  checkboxes: {
    display: 'flex',
    marginBottom: 34,
  },
  checkboxLabel: {
    ...theme.fontMedium(16, 22),
  },
  income: {
    color: POSITIVE_BAR_COLOR,
    marginRight: 54,
  },
  spending: {
    color: PRIMARY_BAR_COLOR,
  },
  slim: {
    marginBottom: 14,
  },
  hidden: {
    display: 'none',
  },
})

const countZeroes = prop =>
  R.pipe(
    R.countBy(R.prop(prop)),
    R.prop('0'),
    R.defaultTo(0)
  )

const makePositive = R.map(({ date, negativeValue }) => ({
  date,
  value: negativeValue,
}))

class BarChart extends React.PureComponent {
  state = {
    income: true,
    spending: true,
  }

  componentWillMount() {
    const { data } = this.props
    const dataSize = R.length(data)
    const zeroValues = countZeroes('value')(data)
    const zeroNegativeValues = countZeroes('negativeValue')(data)
    this.setState({
      income: zeroValues / dataSize < MAX_ZEROES_TO_HIDE,
      spending: zeroNegativeValues / dataSize < MAX_ZEROES_TO_HIDE,
    })
  }

  handleIncomeChange = () => {
    this.setState({ income: !this.state.income })
    // Do it this way to not allow last checkbox un checking
    // const { income, spending } = this.state
    // this.setState({ income: !(income && spending) || !income })
  }

  handleSpendingChange = () => {
    this.setState({ spending: !this.state.spending })
  }

  render() {
    const { classes, className, data } = this.props
    const { income, spending } = this.state

    const hide = !(income || spending)
    const trimmedData = !income ? makePositive(data) : data

    return (
      <div className={className}>
        <div className={cx(classes.checkboxes, { [classes.slim]: hide })}>
          <Checkbox
            checked={income}
            className={classes.income}
            label="Income"
            labelClassName={classes.checkboxLabel}
            onChange={this.handleIncomeChange}
          />
          <Checkbox
            checked={spending}
            className={classes.spending}
            label="Spending"
            labelClassName={classes.checkboxLabel}
            onChange={this.handleSpendingChange}
          />
        </div>
        <Bar
          className={cx(classes.chart, {
            [classes.hidden]: hide,
          })}
          dual={income && spending}
          data={trimmedData}
          labelKey="date"
        />
      </div>
    )
  }
}

export default injectStyles(styles)(BarChart)
