// @flow strict-local
import React from 'react'
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  OverviewPieChartProps,
  PieChartCategories,
} from 'components/OverviewPieChart'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import Totals from 'containers/Widget/Totals'
import Footer, {
  type FooterClasses,
  type FooterProps,
} from 'containers/Widget/Footer'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ConnectedPieTotalSelect from './ConnectedPieTotalSelect'
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
  //
  categoryCount?: number,
  CategoryList?: CategoryListComponent,
  paymentCount?: number,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieItems: PieChartCategories,
  showTotals?: boolean,
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
  showTotals,
  widgetSize,
}: Props) => (
  <div className={contentClassName}>
    {showTotals && <Totals />}
    {widgetSize !== 400 ? (
      <OverviewChart
        CategoryList={CategoryList}
        className={chartClassName}
        onCategoryClick={onCategoryClick}
        onPieTotalChange={onPieTotalChange}
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
          <ConnectedPeriodSelect />
          <ConnectedPieTotalSelect className={classes.standaloneCategoryType} />
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
