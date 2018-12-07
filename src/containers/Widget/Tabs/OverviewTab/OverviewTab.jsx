// @flow strict-local
import React from 'react'
import type {
  CategoryCb,
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  PieChartCategories,
} from 'components/OverviewPieChart'
import { ConnectedPeriodSelect } from 'containers/Widget/PeriodSelect'
import ConnectedCategoryTypeSelect from 'containers/Widget/ConnectedCategoryTypeSelect'
import Totals from 'containers/Widget/Totals'
import Footer, {
  type FooterClasses,
  type FooterProps,
} from 'containers/Widget/Footer'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import JustCategoryList from './JustCategoryList'
import OverviewChart from './OverviewChart'

const styles = {
  selects: {
    display: 'flex',
    flexShrink: 0,
    margin: [6, 0, -1, 2],
  },
  categoryType: {
    marginLeft: 27,
  },
}

type EmptyCb = () => void

export type Props = {|
  ...InjectStylesProps,
  //
  categoryCount?: number,
  CategoryList?: CategoryListComponent,
  categoryType: string,
  paymentCount?: number,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  pieItems: PieChartCategories,
  showTotals?: boolean,
  widgetSize: 375 | 400 | 500 | 625 | 800,
  // Handlers
  onCategoryClick: CategoryCb,
  onCategoryTypeChange: CategoryCb,
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
  categoryType,
  chartClassName,
  classes,
  contentClassName,
  FooterClasses: footerClasses,
  FooterProps: footerProps,
  onCategoryClick,
  onCategoryTypeChange,
  onSeeAllClick,
  paymentCount,
  pieChartRootComponent,
  pieClassName,
  pieItems,
  showTotals,
  widgetSize,
}: Props) => (
  <div className={contentClassName}>
    {showTotals && <Totals />}
    {widgetSize !== 400 ? (
      <OverviewChart
        CategoryList={CategoryList}
        categoryType={categoryType}
        className={chartClassName}
        onCategoryClick={onCategoryClick}
        onCategoryTypeChange={onCategoryTypeChange}
        pieChartRootComponent={pieChartRootComponent}
        pieClassName={pieClassName}
        pieItems={pieItems}
        widgetSize={widgetSize}
      />
    ) : (
      <>
        <div className={classes.selects}>
          <ConnectedPeriodSelect />
          <ConnectedCategoryTypeSelect className={classes.categoryType} />
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
