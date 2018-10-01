import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { barDataProp, pieDataProp } from 'data/models/charts'
import { AboutTab, OverviewTab, PaymentListTab, StoriesTab } from './Tabs'
import { Header, HeaderItem } from './Header'
import {
  barChartDataSelector,
  categoryCountSelector,
  categoryTypeSelector,
  currentCategoryColorSelector,
  currentCategoryNameSelector,
  paymentCountSelector,
  periodSelector,
  periodsSelector,
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
  categoryType,
  className,
  contentClassName,
  currentCategoryColor,
  currentCategoryName,
  dontWrapPiechart,
  onCancelCategoryClick,
  onCategoryClick,
  onCategoryTypeChange,
  onPeriodChange,
  onSeeAllClick,
  onTabSwitch,
  paymentCount,
  paymentBlockClassName,
  paymentBlockTitleClassName,
  paymentClassName,
  paymentListClassName,
  paymentsPeriodClassName,
  period,
  periods,
  pieChartSize,
  pieData,
  showBarChart,
  showCategoryCount,
  showOverviewTotals,
  tab,
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
          data={pieData}
          dontWrapPiechart={dontWrapPiechart}
          categoryType={categoryType}
          contentClassName={contentClassName}
          onCategoryClick={onCategoryClick}
          onCategoryTypeChange={onCategoryTypeChange}
          onPeriodChange={onPeriodChange}
          onSeeAllClick={onSeeAllClick}
          categoryCount={showCategoryCount ? categoryCount : null}
          paymentCount={paymentCount}
          period={period}
          periods={periods}
          size={pieChartSize}
          showTotals={showOverviewTotals}
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
  dontWrapPiechart: PropTypes.bool,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  onTabSwitch: PropTypes.func.isRequired,
  pieChartSize: PropTypes.number.isRequired,
  showBarChart: PropTypes.bool,
  showCategoryCount: PropTypes.bool,
  showOverviewTotals: PropTypes.bool,
  // Selectors
  barsData: barDataProp,
  categoryCount: PropTypes.number,
  categoryType: PropTypes.string,
  currentCategoryColor: PropTypes.string,
  currentCategoryName: PropTypes.string,
  paymentCount: PropTypes.number,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  pieData: PropTypes.objectOf(pieDataProp),
  tab: PropTypes.oneOf(['overview', 'payments', 'stories', 'about']),
  // Styles
  barChartClassName: PropTypes.string,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  paymentBlockClassName: PropTypes.string,
  paymentBlockTitleClassName: PropTypes.string,
  paymentClassName: PropTypes.string,
  paymentListClassName: PropTypes.string,
  paymentsPeriodClassName: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  barsData: barChartDataSelector,
  categoryCount: categoryCountSelector,
  categoryType: categoryTypeSelector,
  currentCategoryColor: currentCategoryColorSelector,
  currentCategoryName: currentCategoryNameSelector,
  paymentCount: paymentCountSelector,
  period: periodSelector,
  periods: periodsSelector,
  pieData: pieChartDataSelector,
  tab: tabSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onCategoryClick: ACTIONS.selectCategory,
    onCategoryTypeChange: ACTIONS.selectCategoryType,
    onCancelCategoryClick: ACTIONS.cancelCategory,
    onPeriodChange: ACTIONS.selectPeriod,
    onSeeAllClick: ACTIONS.selectAllCategories,
    onTabSwitch: ACTIONS.switchTab,
  },
])

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widget)
