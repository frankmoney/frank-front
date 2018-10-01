import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CategoryListPieChart from 'components/CategoryListPieChart'
import { pieDataProp } from 'data/models/charts'
import ConnectedPeriodSelect from '../ConnectedPeriodSelect'

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
  root: {},
  switcher500: {
    fontSize: 15,
    whiteSpace: 'nowrap',
  },
  periodSelect: {
    display: 'flex',
    margin: [4, 0, 0, 1],
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

const OverviewChart = ({
  categoryType,
  className,
  classes,
  data,
  dontWrapPiechart,
  onCategoryClick,
  onCategoryTypeChange,
  periodSelectClassName,
  size,
}) => {
  const switcherLabel = size < 800 ? '% of' : '% of total'
  return (
    <>
      <ConnectedPeriodSelect
        className={cx(classes.periodSelect, periodSelectClassName)}
      />
      <CategoryListPieChart
        categoryType={categoryType}
        chartClassName={classes.chart}
        chartSize={pieSize(size)}
        className={cx(classes.root, className)}
        data={data}
        hideChart={size === 400}
        legendClassName={classes.legend}
        legendIconClassName={classes.legendIcon}
        legendItemClassName={classes.legendItem}
        legendNameClassName={classes.legendItemFont}
        legendValueClassName={classes.legendItemValue}
        noWrap={dontWrapPiechart}
        onCategoryClick={onCategoryClick}
        onCategoryTypeChange={onCategoryTypeChange}
        switcherClassName={size === 500 && classes.switcher500}
        switcherLabel={switcherLabel}
      />
    </>
  )
}

OverviewChart.propTypes = {
  categoryType: PropTypes.string.isRequired,
  data: pieDataProp.isRequired,
  dontWrapPiechart: PropTypes.bool,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
  // Styles
  periodSelectClassName: PropTypes.string,
}

export default injectStyles(styles)(OverviewChart)
