// @flow strict-local
import * as React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import OverviewPieChart from 'components/OverviewPieChart'
import type {
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  OverviewPieChartProps,
  PieChartCategories,
} from 'components/OverviewPieChart'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import OverviewCategoryList from './OverviewCategoryList'

const pieSize = R.cond([
  [R.equals(375), R.always(270)], // button widget size
  [R.equals(500), R.always(170)],
  [R.equals(625), R.always(220)],
  [R.equals(800), R.always(275)],
  [R.T, R.always(0)],
])

const dynamicPieTotalSelectLabel = R.cond([
  [R.equals(375), R.always('% of total')],
  [R.equals(500), R.always('% of')],
  [R.equals(625), R.always('% of')],
  [R.equals(800), R.always('% of total')],
  [R.T, R.always('FIX ME')],
])

const styles = {
  root: {
    justifyContent: 'left',
  },
  customPieTotalSelect: {
    fontSize: 15,
  },
  periodSelect: {
    display: 'flex',
    flexShrink: 0,
    margin: [4, 0, 0, 1],
  },
}

type WidgetWithChartSize = 375 | 500 | 625 | 800

export type Props = {|
  ...OverviewPieChartProps,
  ...InjectStylesProps,
  //
  CategoryList: CategoryListComponent,
  PeriodSelect: ?React.Element<any>, // flowlint-line unclear-type:off
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieClassName?: string,
  pieItems: PieChartCategories,
  widgetSize: WidgetWithChartSize,
|}

const OverviewChart = ({
  CategoryList,
  classes,
  className,
  pieChartRootComponent,
  pieClassName,
  pieItems,
  widgetSize,
  PeriodSelect,
  // omit
  pieTotalSelectClassName,
  pieTotalSelectLabel,
  ...pieChartProps
}: Props) => (
  <>
    {PeriodSelect &&
      React.cloneElement(PeriodSelect, {
        className: classes.periodSelect,
      })}
    <OverviewPieChart
      {...pieChartProps}
      CategoryList={<CategoryList />}
      chartClassName={pieClassName}
      chartSize={pieSize(widgetSize)}
      className={cx(classes.root, className)}
      component={pieChartRootComponent}
      data={pieItems}
      pieTotalSelectLabel={dynamicPieTotalSelectLabel(widgetSize)}
      pieTotalSelectClassName={cx({
        [classes.customPieTotalSelect]: widgetSize === 500,
      })}
    />
  </>
)

OverviewChart.defaultProps = {
  CategoryList: OverviewCategoryList,
}

export default injectStyles(styles)(OverviewChart)
