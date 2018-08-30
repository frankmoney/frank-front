import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import PieChart, { dataPropShape } from 'containers/PieChart'
import { entriesCountSelector, pieChartDataSelector } from '../selectors'
import Footer from './Footer'
import LegendOnly from './LegendOnly'

const pieOffset = R.cond([
  [R.equals(500), R.always(6)],
  [R.equals(625), R.always(40)],
  [R.equals(800), R.always(96)],
  [R.T, R.always(0)],
])

const pieLegendMargin = R.cond([
  [R.equals(500), R.always(25)],
  [R.equals(625), R.always(30)],
  [R.equals(800), R.always(40)],
  [R.T, R.always(0)],
])

const pieSize = R.cond([
  [R.equals(500), R.always(170)],
  [R.equals(625), R.always(220)],
  [R.equals(800), R.always(275)],
  [R.T, R.always(0)],
])

const styles = theme => ({
  switcher500: {
    fontSize: 15,
    whiteSpace: 'nowrap',
  },
  chart: {
    left: ({ size }) => pieOffset(size),
  },
  legend: {
    position: 'relative',
    left: ({ size }) => pieOffset(size) + pieLegendMargin(size),
    paddingBottom: 5,
  },
  legendItem: {
    padding: [2, 0],
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

const ActualChart = ({ classes, entriesCount, period, pieChartData, size }) => {
  const switcherLabel = size < 800 ? '% of' : '% of total'
  return (
    <PieChart
      chartClassName={classes.chart}
      chartSize={pieSize(size)}
      data={pieChartData}
      entriesCount={entriesCount}
      footer={Footer}
      hideChart={size === 400}
      legendClassName={classes.legend}
      legendIconClassName={classes.legendIcon}
      legendItemClassName={classes.legendItem}
      legendNameClassName={classes.legendItemFont}
      legendValueClassName={classes.legendItemValue}
      period={period}
      switcherClassName={size === 500 && classes.switcher500}
      switcherLabel={switcherLabel}
    />
  )
}

const Chart = ({ size, ...props }) => {
  if (size > 400) {
    return <ActualChart size={size} {...props} />
  }
  const { pieChartData, classes, ...otherProps } = props
  return <LegendOnly data={pieChartData} {...otherProps} />
}

Chart.propTypes = {
  period: PropTypes.string,
  pieChartData: dataPropShape,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
}

export default compose(
  connect(state => ({
    entriesCount: entriesCountSelector(state),
    pieChartData: pieChartDataSelector(state),
  })),
  injectStyles(styles)
)(Chart)
