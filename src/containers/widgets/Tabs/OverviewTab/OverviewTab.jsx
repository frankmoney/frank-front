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
import OverviewChart from './OverviewChart'

const styles = {
  selects: {
    display: 'flex',
    flexShrink: 0,
    margin: [6, 0, -1, 2],
  },
  standaloneCategoryType: {
    alignItems: 'normal',
    marginLeft: 27,
    padding: 0,
    position: 'static',
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
  categoryCount?: number,
  CategoryList?: CategoryListComponent,
  paymentCount?: number,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieItems: PieChartCategories,
  widgetSize: 375 | 400 | 500 | 625 | 800,
  // Handlers
  onCategoryClick: CategoryCb,
  // Styles
  chartClassName?: string,
  contentClassName?: string,
  periodSelectClassName?: string,
  pieClassName?: string,
  PeriodSelect: ?React.Element<typeof PeriodSelectComponent>,
|}

const OverviewTab = ({
  CategoryList,
  chartClassName,
  classes,
  contentClassName,
  onCategoryClick,
  onPieTotalChange,
  PaymentsSummary,
  PeriodSelect,
  pieChartRootComponent,
  pieClassName,
  pieItems,
  pieTotal,
  pieTotalSelectable,
  Totals,
  widgetSize,
}: Props) => (
  <div className={contentClassName}>
    {Totals}
    {widgetSize !== 400 ? (
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
        widgetSize={widgetSize}
      />
    ) : (
      <>
        <div className={classes.selects}>
          {PeriodSelect}
          <PieTotalSelect
            className={classes.standaloneCategoryType}
            onChange={onPieTotalChange}
            value={pieTotal}
          />
        </div>
        <JustCategoryList
          onCategoryClick={onCategoryClick}
          pieItems={pieItems}
        />
      </>
    )}
    {PaymentsSummary}
  </div>
)

export default injectStyles(styles)(OverviewTab)
