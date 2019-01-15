// @flow strict-local
import * as React from 'react'
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  OverviewPieChartProps,
  PieChartCategories,
} from 'components/OverviewPieChart'
import PaymentsSummaryComponent from 'components/common/PaymentsSummary'
import PeriodSelectComponent from 'containers/widgets/PeriodSelect'
import PieTotalSelect from 'components/OverviewPieChart/PieTotalSelect'
import TotalsComponent from 'containers/widgets/Totals'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import JustCategoryList from './JustCategoryList'
import OverviewChart, { type WidgetWidth } from './OverviewChart'

const styles = {
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
  standaloneCategoryList: {
    padding: [19, 2],
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
  onCategoryClick: CategoryCb,
  PeriodSelect: ?React.Element<typeof PeriodSelectComponent>,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieClassName?: string,
  pieItems: PieChartCategories,
  showPieChart?: boolean,
  showTotals?: boolean,
  widgetWidth: WidgetWidth,
|}

const OverviewTab = ({
  CategoryList,
  chartClassName,
  classes,
  className,
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
  Totals,
  widgetWidth,
}: Props) => (
  <div className={className}>
    {showTotals && Totals}
    {showPieChart ? (
      <OverviewChart
        CategoryList={CategoryList}
        className={chartClassName}
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
            className={classes.standaloneCategoryType}
            onChange={onPieTotalChange}
            selectable={pieTotalSelectable}
            value={pieTotal}
          />
        </div>
        <JustCategoryList
          className={classes.standaloneCategoryList}
          onCategoryClick={onCategoryClick}
          pieItems={pieItems}
        />
      </>
    )}
    {PaymentsSummary}
  </div>
)

export default injectStyles(styles)(OverviewTab)
