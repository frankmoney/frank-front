import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CategoryListPieChart from 'components/CategoryListPieChart'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import { pieDataProp } from 'data/models/charts'

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
  [R.equals(375), R.always(270)], // button widget size
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
    flexShrink: 0,
    margin: [4, 0, 0, 1],
  },
  chart: {
    left: ({ widgetSize }) => pieOffset(widgetSize),
  },
  legend: {
    position: 'relative',
    left: ({ widgetSize }) =>
      pieOffset(widgetSize) + pieLegendMargin(widgetSize),
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
  categoryListClassName,
  categoryType,
  classes,
  className,
  data,
  dontWrapPiechart,
  onCategoryClick,
  onCategoryTypeChange,
  periodSelectClassName,
  pieClassName,
  widgetSize,
}) => {
  const switcherLabel = widgetSize < 800 ? '% of' : '% of total'
  return (
    <>
      <ConnectedPeriodSelect
        className={cx(classes.periodSelect, periodSelectClassName)}
      />
      <CategoryListPieChart
        categoryType={categoryType}
        chartClassName={cx(classes.chart, pieClassName)}
        chartSize={pieSize(widgetSize)}
        className={cx(classes.root, className)}
        data={data}
        legendClassName={cx(classes.legend, categoryListClassName)}
        legendIconClassName={classes.legendIcon}
        legendItemClassName={classes.legendItem}
        legendNameClassName={classes.legendItemFont}
        legendValueClassName={classes.legendItemValue}
        noWrap={dontWrapPiechart}
        onCategoryClick={onCategoryClick}
        onCategoryTypeChange={onCategoryTypeChange}
        switcherClassName={widgetSize === 500 && classes.switcher500}
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
  widgetSize: PropTypes.oneOf([375, 400, 500, 625, 800]).isRequired,
  // Styles
  categoryListClassName: PropTypes.string,
  periodSelectClassName: PropTypes.string,
  pieClassName: PropTypes.string,
}

export default injectStyles(styles)(OverviewChart)
