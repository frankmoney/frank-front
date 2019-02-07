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
import { between } from 'components/widgets/utils'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import OverviewCategoryList from './OverviewCategoryList'

export type WidgetWidth = number

export type DynamicSizeFn = WidgetWidth => number

const pieSize: DynamicSizeFn = R.cond([
  [R.equals(375), R.always(270)], // button widget size
  [between(500, 625), R.always(170)],
  [between(625, 800), R.always(220)],
  [R.gte(R.__, 800), R.always(275)],
])

const dynamicPieTotalSelectLabel: WidgetWidth => string = width =>
  width === 375 || width >= 800 ? '% of total' : '% of'

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

export type Props = {|
  ...OverviewPieChartProps,
  ...InjectStylesProps,
  //
  CategoryList: CategoryListComponent,
  PeriodSelect: ?React.Element<any>, // flowlint-line unclear-type:off
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieClassName?: string,
  pieItems: PieChartCategories,
  widgetWidth: number,
|}

const OverviewChart = ({
  CategoryList,
  classes,
  className,
  pieChartRootComponent,
  pieClassName,
  pieItems,
  widgetWidth,
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
      chartSize={pieSize(widgetWidth)}
      className={cx(classes.root, className)}
      component={pieChartRootComponent}
      data={pieItems}
      pieTotalSelectLabel={dynamicPieTotalSelectLabel(widgetWidth)}
      pieTotalSelectClassName={cx({
        [classes.customPieTotalSelect]: widgetWidth === 500,
      })}
    />
  </>
)

OverviewChart.defaultProps = {
  CategoryList: OverviewCategoryList,
}

export default injectStyles(styles)(OverviewChart)
