import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PeriodSelector from 'components/LegendPieChart/PeriodSelector'
import Bar from 'components/Charts/Bar'
import { Header, HeaderItem, CategoryName } from './Header'
import OverviewChart, { Footer } from './Chart'
import Payments from './Payments'
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
      stories: Stories,
    } = this.props
    const { tab } = this.state

    const overviewTab = tab === 'payments'
    const paymentListTab = currentCategoryName != null // TODO: redo as a tab
    const storiesTab = tab === 'stories'
    const aboutTab = tab === 'about'

    return (
      <div className={className}>
        {paymentListTab && (
          <Header live={false}>
            <CategoryName
              name={currentCategoryName}
              onClick={() => onCancelCategoryClick()}
            />
          </Header>
        )}
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
        <div className={contentClassName}>
          {overviewTab &&
            paymentListTab && (
              <>
                {showBarChart && (
                  <>
                    <PeriodSelector
                      className={paymentsPeriodClassName}
                      onChange={onPeriodChange}
                      value={period}
                      values={periods}
                    />
                    <Bar
                      barColor={currentCategoryColor}
                      className={barChartClassName}
                      data={barsData}
                      footerPadding={10}
                      height={barsHeight}
                      hideBaseLine
                      labelKey="date"
                      width={barsWidth}
                    />
                  </>
                )}
                <Payments className={paymentsClassName} />
              </>
            )}
          {overviewTab &&
            !paymentListTab && (
              <>
                <OverviewChart
                  categoryType={categoryType}
                  data={pieData}
                  onCategoryClick={onCategoryClick}
                  onCategoryTypeChange={onCategoryTypeChange}
                  onPeriodChange={onPeriodChange}
                  period={period}
                  periods={periods}
                  size={pieChartSize}
                />
                <Footer
                  paymentCount={entriesCount}
                  categoryCount={showCategoryCount ? categoryCount : null}
                  onSeeAllClick={onSeeAllClick}
                />
              </>
            )}
        </div>
        {storiesTab && <Stories />}
        {aboutTab && <div>TODO</div>}
      </div>
    )
  }
}

Widget.propTypes = {
  barsHeight: PropTypes.number.isRequired,
  barsWidth: PropTypes.number.isRequired,
  categoryCount: PropTypes.number,
  categoryType: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  pieChartSize: PropTypes.number.isRequired,
  showBarChart: PropTypes.bool,
  showCategoryCount: PropTypes.bool,
  stories: PropTypes.element,
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
