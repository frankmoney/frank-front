import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CategoryListPieChart from 'components/CategoryListPieChart'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import { pieDataProp } from 'data/models/charts'
import OverviewCategoryList from './OverviewCategoryList'

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

const styles = {
  root: {
    paddingBottom: 5,
  },
  categoryTypeSelect: {
    fontSize: 15,
  },
  periodSelect: {
    display: 'flex',
    flexShrink: 0,
    margin: [4, 0, 0, 1],
  },
}

const OverviewChart = ({
  CategoryList,
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
      CategoryList={CategoryList}
      categoryType={categoryType}
      categoryTypeSelectClassName={
        widgetSize === 500 && classes.categoryTypeSelect
      }
      categoryTypeSelectLabel={categoryTypeSelectLabel(widgetSize)}
      chartClassName={pieClassName}
      chartSize={pieSize(widgetSize)}
      className={cx(classes.root, className)}
      data={data}
      noWrap={dontWrapPiechart}
      onCategoryClick={onCategoryClick}
      onCategoryTypeChange={onCategoryTypeChange}
    />
  </>
)

OverviewChart.propTypes = {
  CategoryList: PropTypes.element,
  categoryType: PropTypes.string.isRequired,
  data: pieDataProp.isRequired,
  dontWrapPiechart: PropTypes.bool,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  widgetSize: PropTypes.oneOf([375, 400, 500, 625, 800]).isRequired,
  // Styles
  periodSelectClassName: PropTypes.string,
  pieClassName: PropTypes.string,
}

OverviewChart.defaultProps = {
  CategoryList: OverviewCategoryList,
}

export default injectStyles(styles)(OverviewChart)