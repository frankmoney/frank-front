// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import Bar, {
  POSITIVE_BAR_COLOR,
  PRIMARY_BAR_COLOR,
  type BarData,
} from 'components/Charts/Bar'
import Checkbox from 'components/kit/Checkbox'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const MAX_ZEROES_TO_HIDE = 0.5

const styles = {
  chart: {},
  checkboxes: {
    display: 'flex',
    marginBottom: 34,
    '& > :not(:last-child)': {
      marginRight: 54,
    },
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  data: ?BarData,
|}

type State = {|
  income: boolean,
  spending: boolean,
|}

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

class BarChart extends React.PureComponent<Props, State> {
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
    // Do it this way to not allow last checkbox unchecking
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

    const barColor =
      income && !spending ? POSITIVE_BAR_COLOR : PRIMARY_BAR_COLOR

    return (
      <div className={className}>
        <div className={classes.checkboxes}>
          <Checkbox
            color="green"
            checked={income}
            label="Income"
            onChange={this.handleIncomeChange}
          />
          <Checkbox
            checked={spending}
            label="Spending"
            onChange={this.handleSpendingChange}
          />
        </div>
        <Bar
          barColor={barColor}
          className={classes.chart}
          data={trimmedData}
          dual={income && spending}
          labelKey="date"
          showBars={!hide}
          width={600}
        />
      </div>
    )
  }
}

export default injectStyles(styles)(BarChart)
