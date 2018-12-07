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
  categoryTypeSelector,
  currentCategoryColorSelector,
  currentCategoryNameSelector,
  paymentCountSelector,
  pieItemsSelector,
  tabSelector,
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
  categoryType,
  className,
  contentClassName,
  currentCategoryColor,
  currentCategoryName,
  onCancelCategoryClick,
  onCategoryClick,
  onCategoryTypeChange,
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
          categoryType={categoryType}
          chartClassName={overviewChartClassName}
          contentClassName={contentClassName}
          FooterClasses={OverviewFooterClasses}
          FooterProps={OverviewFooterProps}
          onCategoryClick={onCategoryClick}
          onCategoryTypeChange={onCategoryTypeChange}
          onSeeAllClick={onSeeAllClick}
          paymentCount={paymentCount}
          pieChartRootComponent={pieChartRootComponent}
          pieClassName={pieChartClassName}
          pieItems={pieItems}
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
  categoryType: categoryTypeSelector,
  currentCategoryColor: currentCategoryColorSelector,
  currentCategoryName: currentCategoryNameSelector,
  paymentCount: paymentCountSelector,
  pieItems: pieItemsSelector,
  tab: tabSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onCategoryClick: ACTIONS.selectCategory,
    onCategoryTypeChange: ACTIONS.selectCategoryType,
    onCancelCategoryClick: ACTIONS.cancelCategory,
    onSeeAllClick: ACTIONS.selectAllCategories,
    onTabSwitch: ACTIONS.switchTab,
  },
])

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widget)
