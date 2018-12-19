// @flow strict-local
import React from 'react'
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  OverviewPieChartProps,
  PieChartCategories,
} from 'components/OverviewPieChart'
import PieTotalSelect from 'components/OverviewPieChart/PieTotalSelect'
import Totals, { type TotalsProps } from 'containers/widgets/Totals'
import Footer, {
  type FooterClasses,
  type FooterProps,
} from 'containers/widgets/Footer'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import PeriodSelect, { type PeriodSelectProps } from '../../PeriodSelect'
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

type EmptyCb = () => void

export type Props = {|
  ...OverviewPieChartProps,
  ...InjectStylesProps,
  ...PeriodSelectProps,
  //
  categoryCount?: number,
  CategoryList?: CategoryListComponent,
  paymentCount?: number,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieItems: PieChartCategories,
  totals: ?TotalsProps,
  widgetSize: 375 | 400 | 500 | 625 | 800,
  // Handlers
  onCategoryClick: CategoryCb,
  onSeeAllClick: EmptyCb,
  // Styles
  chartClassName?: string,
  contentClassName?: string,
  periodSelectClassName?: string,
  pieClassName?: string,
  //
  FooterClasses?: FooterClasses,
  FooterProps?: FooterProps,
|}

const OverviewTab = ({
  categoryCount,
  CategoryList,
  chartClassName,
  classes,
  contentClassName,
  FooterClasses: footerClasses,
  FooterProps: footerProps,
  onCategoryClick,
  onPieTotalChange,
  onSeeAllClick,
  paymentCount,
  pieChartRootComponent,
  pieClassName,
  pieItems,
  pieTotal,
  pieTotalSelectable,
  totals,
  widgetSize,
  // period select
  onPeriodChange,
  period,
  periods,
}: Props) => (
  <div className={contentClassName}>
    {totals && <Totals {...totals} />}
    {widgetSize !== 400 ? (
      <OverviewChart
        CategoryList={CategoryList}
        className={chartClassName}
        onCategoryClick={onCategoryClick}
        onPieTotalChange={onPieTotalChange}
        period={period}
        periods={periods}
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
          <PeriodSelect
            onPeriodChange={onPeriodChange}
            period={period}
            periods={periods}
          />
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
    <Footer
      categoryCount={categoryCount}
      Classes={footerClasses}
      onSeeAllClick={onSeeAllClick}
      paymentCount={paymentCount}
      {...footerProps}
    />
  </div>
)

export default injectStyles(styles)(OverviewTab)
