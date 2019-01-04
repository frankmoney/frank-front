// @flow strict-local
import * as React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import Bar, {
  POSITIVE_BAR_COLOR,
  PRIMARY_BAR_COLOR,
  type BarData,
} from 'components/Charts/Bar'
import Checkbox from 'components/kit/Checkbox'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const MAX_ZEROES_TO_HIDE = 1

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

type CheckboxColor = 'green' | 'blue'

export type CheckboxProps = {
  checked: boolean,
  color: CheckboxColor,
  label: string,
  onChange: () => void,
}

type CheckboxMixins = {|
  checkboxes?: string,
  checkbox?: string,
|}

type Props = {|
  ...InjectStylesProps,
  //
  barsColor?: string,
  CheckboxComponent: React.ComponentType<CheckboxProps>,
  data: BarData,
  height?: number,
  Mixins?: CheckboxMixins,
  mobile?: boolean,
  width: number,
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

class TimelineChart extends React.PureComponent<Props, State> {
  static defaultProps = {
    CheckboxComponent: Checkbox,
  }

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
    const {
      barsColor,
      CheckboxComponent,
      classes,
      className,
      data,
      Mixins,
      ...barProps
    } = this.props
    const { income, spending } = this.state

    const forcedSingle = typeof barsColor === 'string'

    const hide = !(income || spending)
    const trimmedData = income && !forcedSingle ? data : makePositive(data)

    const barColor =
      barsColor ||
      (income && !spending ? POSITIVE_BAR_COLOR : PRIMARY_BAR_COLOR)
    const showCheckboxes = !forcedSingle
    const renderDual = showCheckboxes && income && spending

    return (
      <div className={className}>
        {showCheckboxes && (
          <div className={cx(classes.checkboxes, Mixins && Mixins.checkboxes)}>
            <CheckboxComponent
              color="green"
              className={Mixins && Mixins.checkbox}
              checked={income}
              label="Income"
              onChange={this.handleIncomeChange}
            />
            <CheckboxComponent
              color="blue"
              className={Mixins && Mixins.checkbox}
              checked={spending}
              label="Spending"
              onChange={this.handleSpendingChange}
            />
          </div>
        )}
        <Bar
          barColor={barColor}
          className={classes.chart}
          data={trimmedData}
          dual={renderDual}
          labelKey="date"
          showBars={!hide}
          {...barProps}
        />
      </div>
    )
  }
}

export default injectStyles(styles)(TimelineChart)
