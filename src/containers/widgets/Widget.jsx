// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import reconnect from 'utils/reconnect'
import TabbedLayout from './TabbedLayout'
import { AboutTab, OverviewTab, PaymentListTab, StoriesTab } from './Tabs'
import {
  barChartDataSelector,
  currentCategoryColorSelector,
  currentCategoryNameSelector,
  paymentCountSelector,
  pieItemsSelector,
  pieTotalSelector,
  tabSelector,
  totalSelectableSelector,
} from './selectors'
import * as ACTIONS from './actions'
import type { Props } from './Widget.flow'

const Widget = ({
  barChartClassName,
  barsData,
  barsFooterPadding,
  barsHeight,
  barsWidth,
  CategoryList,
  contentClassName,
  currentCategoryColor,
  currentCategoryName,
  onCancelCategoryClick,
  onCategoryClick,
  onPieTotalChange,
  onSeeAllClick,
  overviewChartClassName,
  OverviewFooterClasses,
  OverviewFooterProps,
  paymentBlockClassName,
  paymentBlockTitleClassName,
  paymentClassName,
  paymentCount,
  paymentListClassName,
  paymentsPeriodClassName,
  pieChartClassName,
  pieChartRootComponent,
  pieItems,
  pieTotal,
  pieTotalSelectable,
  showBarChart,
  showCategoryCount,
  showOverviewTotals,
  widgetSize,
  // omit
  pieTotalSelectClassName,
  pieTotalSelectLabel,
  ...layoutProps
}: Props) => {
  const categoryCount = showCategoryCount ? R.length(pieItems) : null
  return (
    <TabbedLayout
      {...layoutProps}
      OverviewTab={
        <OverviewTab
          categoryCount={categoryCount}
          CategoryList={CategoryList}
          chartClassName={overviewChartClassName}
          contentClassName={contentClassName}
          FooterClasses={OverviewFooterClasses}
          FooterProps={OverviewFooterProps}
          onCategoryClick={onCategoryClick}
          onPieTotalChange={onPieTotalChange}
          onSeeAllClick={onSeeAllClick}
          paymentCount={paymentCount}
          pieChartRootComponent={pieChartRootComponent}
          pieClassName={pieChartClassName}
          pieItems={pieItems}
          pieTotal={pieTotal}
          pieTotalSelectable={pieTotalSelectable}
          showTotals={showOverviewTotals}
          widgetSize={widgetSize}
        />
      }
      PaymentListTab={
        <PaymentListTab
          barChartClassName={barChartClassName}
          barsData={barsData}
          barsHeight={barsHeight}
          barsWidth={barsWidth}
          contentClassName={contentClassName}
          currentCategoryColor={currentCategoryColor}
          currentCategoryName={currentCategoryName}
          footerPadding={barsFooterPadding}
          onCancelCategoryClick={onCancelCategoryClick}
          paymentBlockClassName={paymentBlockClassName}
          paymentBlockTitleClassName={paymentBlockTitleClassName}
          paymentClassName={paymentClassName}
          paymentListClassName={paymentListClassName}
          paymentsPeriodClassName={paymentsPeriodClassName}
          showBarChart={showBarChart}
        />
      }
      StoriesTab={<StoriesTab />}
      AboutTab={<AboutTab />}
    />
  )
}

export default reconnect(
  {
    barsData: barChartDataSelector,
    currentCategoryColor: currentCategoryColorSelector,
    currentCategoryName: currentCategoryNameSelector,
    paymentCount: paymentCountSelector,
    pieItems: pieItemsSelector,
    pieTotal: pieTotalSelector,
    pieTotalSelectable: totalSelectableSelector,
    tab: tabSelector,
  },
  {
    onCancelCategoryClick: ACTIONS.cancelCategory,
    onCategoryClick: ACTIONS.selectCategory,
    onPieTotalChange: ACTIONS.selectPieTotal,
    onSeeAllClick: ACTIONS.selectAllCategories,
    onTabSwitch: ACTIONS.switchTab,
  }
)(Widget)
