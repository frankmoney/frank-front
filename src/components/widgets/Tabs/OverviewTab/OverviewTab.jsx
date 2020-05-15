// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  OverviewPieChartProps,
  PieChartCategories,
} from 'components/OverviewPieChart'
import PaymentsSummaryComponent from 'components/common/PaymentsSummary'
import PeriodSelectComponent from 'components/widgets/PeriodSelect'
import PieTotalSelect from 'components/OverviewPieChart/PieTotalSelect'
import TotalsComponent from 'components/widgets/Totals'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import JustCategoryList from './JustCategoryList'
import OverviewChart, { type WidgetWidth } from './OverviewChart'

const styles = {
  root: {},
  selects: {
    display: 'flex',
    flexShrink: 0,
    margin: [6, 0, -1, 2],
    '& > :not(:last-child)': {
      marginRight: 27,
    },
  },
  standaloneCategoryType: {
    fontSize: 18,
    padding: [3, 0, 0],
    position: 'static',
  },
  smallSelect: {
    fontSize: 16,
  },
  standaloneCategoryList: {
    padding: [19, 2],
  },
  smallList: {
    padding: [14, 1],
  },
  smallListItem: {
    fontSize: 16,
    '&:not(:last-child)': {
      paddingBottom: 8,
    },
  },
  smallListItemIcon: {
    width: 12,
    height: 12,
  },
}

export type OverviewTabProps = {|
  PaymentsSummary: ?React.Element<typeof PaymentsSummaryComponent>,
  Totals: ?React.Element<typeof TotalsComponent>,
|}

type Props = {|
  ...OverviewPieChartProps,
  ...InjectStylesProps,
  ...OverviewTabProps,
  //
  CategoryList: CategoryListComponent,
  chartClassName?: string,
  className?: string,
  noHover?: boolean,
  onCategoryClick: CategoryCb,
  PeriodSelect: ?React.Element<typeof PeriodSelectComponent>,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieClassName?: string,
  pieItems: PieChartCategories,
  showPieChart?: boolean,
  showTotals?: boolean,
  small?: boolean,
  widgetWidth: WidgetWidth,
|}

const OverviewTab = ({
  CategoryList,
  chartClassName,
  classes,
  className,
  noHover,
  onCategoryClick,
  onPieTotalChange,
  PaymentsSummary,
  PeriodSelect,
  pieChartRootComponent,
  pieClassName,
  pieItems,
  pieTotal,
  pieTotalSelectable,
  showPieChart,
  showTotals,
  small,
  Totals,
  widgetWidth,
}: Props) => (
  <div className={cx(classes.root, className)}>
    {showTotals && Totals}
    {showPieChart ? (
      <OverviewChart
        CategoryList={CategoryList}
        className={chartClassName}
        mobile={noHover}
        onCategoryClick={onCategoryClick}
        onPieTotalChange={onPieTotalChange}
        PeriodSelect={PeriodSelect}
        pieChartRootComponent={pieChartRootComponent}
        pieClassName={pieClassName}
        pieItems={pieItems}
        pieTotal={pieTotal}
        pieTotalSelectable={pieTotalSelectable}
        widgetWidth={widgetWidth}
      />
    ) : (
      <>
        <div className={classes.selects}>
          {PeriodSelect}
          <PieTotalSelect
            className={cx(classes.standaloneCategoryType, {
              [classes.smallSelect]: small,
            })}
            onChange={onPieTotalChange}
            selectable={pieTotalSelectable}
            value={pieTotal}
          />
        </div>
        <JustCategoryList
          className={cx(classes.standaloneCategoryList, {
            [classes.smallList]: small,
          })}
          iconClassName={cx({
            [classes.smallListItemIcon]: small,
          })}
          itemClassName={cx({
            [classes.smallListItem]: small,
          })}
          onCategoryClick={onCategoryClick}
          pieItems={pieItems}
        />
      </>
    )}
    {PaymentsSummary}
  </div>
)

export default injectStyles(styles)(OverviewTab)
