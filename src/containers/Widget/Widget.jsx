// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AboutTab, OverviewTab, PaymentListTab, StoriesTab } from './Tabs'
import { Header, HeaderItem } from './Header'
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
  className,
  contentClassName,
  currentCategoryColor,
  currentCategoryName,
  onCancelCategoryClick,
  onCategoryClick,
  onPieTotalChange,
  onSeeAllClick,
  onTabSwitch,
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
  tab,
  widgetSize,
}: Props) => {
  const isOverviewTab = tab === 'overview'
  const isPaymentListTab = tab === 'payments'
  const isStoriesTab = tab === 'stories'
  const isAboutTab = tab === 'about'

  const categoryCount = showCategoryCount ? R.length(pieItems) : null

  return (
    <div className={className}>
      {!isPaymentListTab && (
        <Header>
          <HeaderItem
            name="Payments"
            active={isOverviewTab}
            onClick={() => onTabSwitch('overview')}
          />
          <HeaderItem
            name="Stories"
            active={isStoriesTab}
            onClick={() => onTabSwitch('stories')}
          />
          <HeaderItem
            name="About"
            active={isAboutTab}
            onClick={() => onTabSwitch('about')}
          />
        </Header>
      )}
      {isOverviewTab && (
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
      )}
      {isPaymentListTab && (
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
      )}
      {isStoriesTab && <StoriesTab />}
      {isAboutTab && <AboutTab />}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  barsData: barChartDataSelector,
  currentCategoryColor: currentCategoryColorSelector,
  currentCategoryName: currentCategoryNameSelector,
  paymentCount: paymentCountSelector,
  pieItems: pieItemsSelector,
  pieTotal: pieTotalSelector,
  pieTotalSelectable: totalSelectableSelector,
  tab: tabSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onCancelCategoryClick: ACTIONS.cancelCategory,
    onCategoryClick: ACTIONS.selectCategory,
    onPieTotalChange: ACTIONS.selectPieTotal,
    onSeeAllClick: ACTIONS.selectAllCategories,
    onTabSwitch: ACTIONS.switchTab,
  },
])

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widget)
