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
  entriesCountSelector,
  periodSelector,
  periodsSelector,
  pieChartDataSelector,
} from './selectors'
import * as ACTIONS from './actions'

class Widget extends React.PureComponent {
  state = {
    tab: 'payments',
  }

  switchTab = tab => () => this.setState({ tab })

  render() {
    const {
      barChartClassName,
      barsData,
      barsHeight,
      barsWidth,
      categoryCount,
      categoryType,
      className,
      contentClassName,
      currentCategoryColor,
      currentCategoryName,
      entriesCount,
      onCancelCategoryClick,
      onCategoryClick,
      onCategoryTypeChange,
      onPeriodChange,
      onSeeAllClick,
      paymentsClassName,
      paymentsPeriodClassName,
      period,
      periods,
      pieChartSize,
      pieData,
      showBarChart,
      showCategoryCount,
    } = this.props

    const { tab } = this.state
    const selectedCategory = currentCategoryName != null
    const overviewTab = tab === 'payments' && !selectedCategory
    const paymentListTab = tab === 'payments' && selectedCategory // TODO: redo as a tab
    const storiesTab = tab === 'stories'
    const aboutTab = tab === 'about'

    return (
      <div className={className}>
        {!paymentListTab && (
          <Header>
            <HeaderItem
              name="Payments"
              active={overviewTab}
              onClick={this.switchTab('payments')}
            />
            <HeaderItem
              name="Stories"
              active={storiesTab}
              onClick={this.switchTab('stories')}
            />
            <HeaderItem
              name="About"
              active={aboutTab}
              onClick={this.switchTab('about')}
            />
          </Header>
        )}
        {overviewTab && (
          <OverviewTab
            data={pieData}
            categoryType={categoryType}
            contentClassName={contentClassName}
            onCategoryClick={onCategoryClick}
            onCategoryTypeChange={onCategoryTypeChange}
            onPeriodChange={onPeriodChange}
            onSeeAllClick={onSeeAllClick}
            categoryCount={showCategoryCount ? categoryCount : null}
            paymentCount={entriesCount}
            period={period}
            periods={periods}
            size={pieChartSize}
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
            onCancelCategoryClick={onCancelCategoryClick}
            onPeriodChange={onPeriodChange}
            paymentsClassName={paymentsClassName}
            paymentsPeriodClassName={paymentsPeriodClassName}
            period={period}
            periods={periods}
            showBarChart={showBarChart}
          />
        )}
        {storiesTab && <StoriesTab />}
        {aboutTab && <AboutTab />}
      </div>
    )
  }
}

Widget.propTypes = {
  barsHeight: PropTypes.number.isRequired,
  barsWidth: PropTypes.number.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  pieChartSize: PropTypes.number.isRequired,
  showBarChart: PropTypes.bool,
  showCategoryCount: PropTypes.bool,
  // Selectors
  barsData: barDataProp,
  categoryCount: PropTypes.number,
  categoryType: PropTypes.string,
  currentCategoryColor: PropTypes.string,
  currentCategoryName: PropTypes.string,
  entriesCount: PropTypes.number,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  pieData: pieDataProp,
  // tab: PropTypes.oneOf(['payments', 'stories', 'about']), // TODO: wait for selector
  // Styles
  barChartClassName: PropTypes.string,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  paymentsClassName: PropTypes.string,
  paymentsPeriodClassName: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  barsData: barChartDataSelector,
  categoryCount: categoryCountSelector,
  categoryType: categoryTypeSelector,
  currentCategoryColor: currentCategoryColorSelector,
  currentCategoryName: currentCategoryNameSelector,
  entriesCount: entriesCountSelector,
  period: periodSelector,
  periods: periodsSelector,
  pieData: pieChartDataSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onCategoryClick: ACTIONS.selectCategory,
    onCategoryTypeChange: ACTIONS.selectCategoryType,
    onCancelCategoryClick: ACTIONS.cancelCategory,
    onPeriodChange: ACTIONS.selectPeriod,
    onSeeAllClick: ACTIONS.selectAllCategories,
  },
])

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widget)
