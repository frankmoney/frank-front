import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { barDataProp, pieDataProp } from 'components/Charts/types'
import { footerClasses, footerProps } from 'containers/Widget/Footer'
import { AboutTab, OverviewTab, PaymentListTab, StoriesTab } from './Tabs'
import { Header, HeaderItem } from './Header'
import {
  barChartDataSelector,
  categoryCountSelector,
  categoryTypeSelector,
  currentCategoryColorSelector,
  currentCategoryNameSelector,
  paymentCountSelector,
  pieChartDataSelector,
  tabSelector,
} from './selectors'
import * as ACTIONS from './actions'

const Widget = ({
  barChartClassName,
  barsData,
  barsFooterPadding,
  barsHeight,
  barsWidth,
  categoryCount,
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
  pieData,
  showBarChart,
  showCategoryCount,
  showOverviewTotals,
  tab,
  widgetSize,
}) => {
  const overviewTab = tab === 'overview'
  const paymentListTab = tab === 'payments'
  const storiesTab = tab === 'stories'
  const aboutTab = tab === 'about'

  return (
    <div className={className}>
      {!paymentListTab && (
        <Header>
          <HeaderItem
            name="Payments"
            active={overviewTab}
            onClick={() => onTabSwitch('overview')}
          />
          <HeaderItem
            name="Stories"
            active={storiesTab}
            onClick={() => onTabSwitch('stories')}
          />
          <HeaderItem
            name="About"
            active={aboutTab}
            onClick={() => onTabSwitch('about')}
          />
        </Header>
      )}
      {overviewTab && (
        <OverviewTab
          categoryCount={showCategoryCount ? categoryCount : null}
          CategoryList={CategoryList}
          categoryType={categoryType}
          chartClassName={overviewChartClassName}
          contentClassName={contentClassName}
          data={pieData}
          FooterClasses={OverviewFooterClasses}
          FooterProps={OverviewFooterProps}
          onCategoryClick={onCategoryClick}
          onCategoryTypeChange={onCategoryTypeChange}
          onSeeAllClick={onSeeAllClick}
          paymentCount={paymentCount}
          pieClassName={pieChartClassName}
          pieChartRootComponent={pieChartRootComponent}
          showTotals={showOverviewTotals}
          widgetSize={widgetSize}
        />
      )}
      {paymentListTab && (
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
      {storiesTab && <StoriesTab />}
      {aboutTab && <AboutTab />}
    </div>
  )
}

Widget.propTypes = {
  barsFooterPadding: PropTypes.number.isRequired,
  barsHeight: PropTypes.number.isRequired,
  barsWidth: PropTypes.number.isRequired,
  CategoryList: PropTypes.element,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  onTabSwitch: PropTypes.func.isRequired,
  pieChartRootComponent: PropTypes.element,
  showBarChart: PropTypes.bool,
  showCategoryCount: PropTypes.bool,
  showOverviewTotals: PropTypes.bool,
  widgetSize: PropTypes.number.isRequired,
  // Selectors
  barsData: barDataProp,
  categoryCount: PropTypes.number,
  categoryType: PropTypes.string,
  currentCategoryColor: PropTypes.string,
  currentCategoryName: PropTypes.string,
  paymentCount: PropTypes.number,
  pieData: PropTypes.objectOf(pieDataProp),
  tab: PropTypes.oneOf(['overview', 'payments', 'stories', 'about']),
  // Styles
  barChartClassName: PropTypes.string,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  overviewChartClassName: PropTypes.string,
  paymentBlockClassName: PropTypes.string,
  paymentBlockTitleClassName: PropTypes.string,
  paymentClassName: PropTypes.string,
  paymentListClassName: PropTypes.string,
  paymentsPeriodClassName: PropTypes.string,
  pieChartClassName: PropTypes.string,
  //
  OverviewFooterClasses: footerClasses,
  OverviewFooterProps: footerProps,
}

const mapStateToProps = createStructuredSelector({
  barsData: barChartDataSelector,
  categoryCount: categoryCountSelector,
  categoryType: categoryTypeSelector,
  currentCategoryColor: currentCategoryColorSelector,
  currentCategoryName: currentCategoryNameSelector,
  paymentCount: paymentCountSelector,
  pieData: pieChartDataSelector,
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
