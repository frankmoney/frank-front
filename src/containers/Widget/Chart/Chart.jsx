import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import {
  categoricalDataSelector,
  dualDataSelector,
} from 'components/Charts/selectors'
import { categoricalDataShape } from 'components/Charts/shapes'
import PieChart from 'containers/PieChart'
import { name } from '../reducer'
import PeriodSelector from './PeriodSelector'
import Footer from './Footer'
import LegendOnly from './LegendOnly'

const pieLegendMargin = R.cond([
  [R.equals(500), R.always(25)],
  [R.equals(625), R.always(30)],
  [R.equals(800), R.always(40)],
  [R.T, R.always(0)],
])

const styles = theme => ({
  chart: {
    padding: [0, 17, 2, 0],
    margin: 'auto',
  },
  periodSelect: {
    margin: [1, 0, 16],
    textAlign: 'left',
  },
  switcher500: {
    fontSize: 15,
    whiteSpace: 'nowrap',
  },
  legend: {
    margin: ({ size }) => `-9px 0 0 ${pieLegendMargin(size)}px`,
  },
  legendItem: {
    '&:not(:first-child)': {
      marginTop: 5,
    },
  },
  legendItemFont: {
    ...theme.fontMedium(18, 26),
  },
  legendItemValue: {
    ...theme.fontRegular(18, 26),
  },
  legendIcon: {
    height: 14,
    width: 14,
  },
})

const pieChartSize = R.cond([
  [R.equals(500), R.always(170)],
  [R.equals(625), R.always(220)],
  [R.equals(800), R.always(275)],
  [R.T, R.always(0)],
])

const ActualChart = ({ categoricalData, classes, period, size }) => {
  const switcherLabel = size < 800 ? '% of' : '% of total'
  return (
    <>
      <PeriodSelector className={classes.periodSelect} value={period} />
      <PieChart
        categories={categoricalData}
        chartSize={pieChartSize(size)}
        className={classes.chart}
        hideChart={size === 400}
        legendClassName={classes.legend}
        legendIconClassName={classes.legendIcon}
        legendItemClassName={classes.legendItem}
        legendNameClassName={classes.legendItemFont}
        legendValueClassName={classes.legendItemValue}
        switcherClassName={size === 500 && classes.switcher500}
        switcherLabel={switcherLabel}
      />
      <Footer paymentCount={954} categoryCount={5} />
    </>
  )
}

const Chart = ({ size, ...props }) => {
  if (size > 400) {
    return <ActualChart size={size} {...props} />
  }
  const { categoricalData, period, ...otherProps } = props
  return <LegendOnly data={categoricalData} period={period} {...otherProps} />
}

Chart.propTypes = {
  categoricalData: PropTypes.arrayOf(categoricalDataShape),
  period: PropTypes.string,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
}

export default compose(
  connect(state => ({
    categoricalData: categoricalDataSelector(name)(state),
    dualData: dualDataSelector(name)(state),
  })),
  injectStyles(styles)
)(Chart)
