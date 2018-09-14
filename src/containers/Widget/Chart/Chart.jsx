import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import PieChart, { dataPropShape } from 'containers/PieChart'
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
  root: {
    // TODO: fix size in PieChart, check in Ledger
    width: 'unset',
    height: 'unset',
    flexGrow: 1,
    paddingTop: 20, // centering the chart vertically
  },
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

const ActualChart = ({
  categoryType,
  classes,
  onCategoryClick,
  onCategoryTypeChange,
  onPeriodChange,
  period,
  periods,
  pieData,
  size,
}) => {
  const switcherLabel = size < 800 ? '% of' : '% of total'
  return (
    <PieChart
      categoryType={categoryType}
      chartClassName={classes.chart}
      chartSize={pieSize(size)}
      className={classes.root}
      data={pieData}
      hideChart={size === 400}
      legendClassName={classes.legend}
      legendIconClassName={classes.legendIcon}
      legendItemClassName={classes.legendItem}
      legendNameClassName={classes.legendItemFont}
      legendValueClassName={classes.legendItemValue}
      onCategoryClick={onCategoryClick}
      onCategoryTypeChange={onCategoryTypeChange}
      onPeriodChange={onPeriodChange}
      period={period}
      periods={periods}
      switcherClassName={size === 500 && classes.switcher500}
      switcherLabel={switcherLabel}
    />
  )
}

const Chart = ({ size, ...props }) => {
  if (size > 400) {
    return <ActualChart size={size} {...props} />
  }
  const { pieData, classes, ...otherProps } = props
  return <LegendOnly data={pieData} {...otherProps} />
}

Chart.propTypes = {
  categoryType: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  pieData: dataPropShape.isRequired,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
}

export default injectStyles(styles)(Chart)
