import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { categoryListClasses } from 'components/CategoryList'
import CategoryListPieChart from 'components/CategoryListPieChart'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import { pieDataProp } from 'data/models/charts'
import combineClassNames from 'utils/combineClassNames'

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

const categoryTypeSelectLabel = R.cond([
  [R.equals(375), R.always('% of total')],
  [R.equals(500), R.always('% of')],
  [R.equals(625), R.always('% of')],
  [R.equals(800), R.always('% of total')],
  [R.T, R.always('FIX ME')],
])

const styles = theme => ({
  root: {},
  categoryTypeSelect: {
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
  CategoryListClasses,
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
}) => (
  <>
    <ConnectedPeriodSelect
      className={cx(classes.periodSelect, periodSelectClassName)}
    />
    <CategoryListPieChart
      categoryType={categoryType}
      categoryTypeSelectClassName={
        widgetSize === 500 && classes.categoryTypeSelect
      }
      categoryTypeSelectLabel={categoryTypeSelectLabel(widgetSize)}
      chartClassName={cx(classes.chart, pieClassName)}
      chartSize={pieSize(widgetSize)}
      className={cx(classes.root, className)}
      data={data}
      CategoryListClasses={combineClassNames(
        {
          icon: classes.legendIcon,
          item: classes.legendItem,
          name: classes.legendItemFont,
          root: classes.legend,
          value: classes.legendItemValue,
        },
        CategoryListClasses
      )}
      noWrap={dontWrapPiechart}
      onCategoryClick={onCategoryClick}
      onCategoryTypeChange={onCategoryTypeChange}
    />
  </>
)

OverviewChart.propTypes = {
  categoryType: PropTypes.string.isRequired,
  data: pieDataProp.isRequired,
  dontWrapPiechart: PropTypes.bool,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  widgetSize: PropTypes.oneOf([375, 400, 500, 625, 800]).isRequired,
  // Styles
  periodSelectClassName: PropTypes.string,
  pieClassName: PropTypes.string,
  //
  CategoryListClasses: categoryListClasses,
}

export default injectStyles(styles)(OverviewChart)
