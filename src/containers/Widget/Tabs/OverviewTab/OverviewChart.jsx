// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import OverviewPieChart from 'components/OverviewPieChart'
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  PieChartCategories,
} from 'components/OverviewPieChart'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
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

export type Props = {|
  ...InjectStylesProps,
  //
  CategoryList?: CategoryListComponent,
  categoryType: string,
  data: PieChartCategories,
  onCategoryClick: CategoryCb,
  onCategoryTypeChange: CategoryCb,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  widgetSize: 375 | 500 | 625 | 800,
  // Styles
  periodSelectClassName?: string,
  pieClassName?: string,
|}

const OverviewChart = ({
  CategoryList,
  categoryType,
  classes,
  className,
  data,
  onCategoryClick,
  onCategoryTypeChange,
  periodSelectClassName,
  pieChartRootComponent,
  pieClassName,
  widgetSize,
}: Props) => (
  <>
    <ConnectedPeriodSelect
      className={cx(classes.periodSelect, periodSelectClassName)}
    />
    <OverviewPieChart
      CategoryList={CategoryList && <CategoryList />}
      categoryType={categoryType}
      categoryTypeSelectClassName={{
        [classes.categoryTypeSelect]: widgetSize === 500,
      }}
      categoryTypeSelectLabel={categoryTypeSelectLabel(widgetSize)}
      chartClassName={pieClassName}
      chartSize={pieSize(widgetSize)}
      className={cx(classes.root, className)}
      data={data}
      component={pieChartRootComponent}
      onCategoryClick={onCategoryClick}
      onCategoryTypeChange={onCategoryTypeChange}
    />
  </>
)

OverviewChart.defaultProps = {
  CategoryList: OverviewCategoryList,
}

export default injectStyles(styles)(OverviewChart)
