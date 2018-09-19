import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
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
    tab: this.props.tab,
  }

  switchTab = tab => () => this.setState({ tab })

  render() {
    const {
      barsData,
      barsHeight,
      categoryCount,
      categoryType,
      classes,
      className,
      currentCategoryColor,
      currentCategoryName,
      entriesCount,
      onCategoryClick,
      onCancelCategoryClick,
      onCategoryTypeChange,
      onPeriodChange,
      onSeeAllClick,
      stories: Stories,
      period,
      periods,
      pieData,
      size,
    } = this.props
    const { tab } = this.state
    const paymentList = currentCategoryName != null // TODO: redo as a tab?

    const isPayments = tab === 'payments'
    const isStories = tab === 'stories'
    const isAbout = tab === 'about'

    const small = size === 400

    return (
      <div
        className={cx(
          classes.root,
          {
            [classes.size400]: small,
            [classes.size500]: size === 500,
            [classes.size625]: size === 625,
            [classes.size800]: size === 800,
          },
          className
        )}
      >
        {paymentList && (
          <Header live={false}>
            <CategoryName
              name={currentCategoryName}
              onClick={() => onCancelCategoryClick()}
            />
          </Header>
        )}
        {!paymentList && (
          <Header>
            <HeaderItem
              name="Payments"
              active={isPayments}
              onClick={this.switchTab('payments')}
            />
            <HeaderItem
              name="Stories"
              active={isStories}
              onClick={this.switchTab('stories')}
            />
            <HeaderItem
              name="About"
              active={isAbout}
              onClick={this.switchTab('about')}
            />
          </Header>
        )}
        <div className={classes.content}>
          {isPayments &&
            paymentList && (
              <>
                {!small && (
                  <>
                    <PeriodSelector
                      className={cx(classes.paymentsPeriodSelect)}
                      onChange={onPeriodChange}
                      value={period}
                      values={periods}
                    />
                    <Bar
                      barColor={currentCategoryColor}
                      className={classes.barChart}
                      data={barsData}
                      footerPadding={10}
                      height={barsHeight(size)}
                      hideBaseLine
                      labelKey="date"
                      width={size > 500 ? 516 : 468}
                    />
                  </>
                )}
                <Payments className={classes.payments} />
              </>
            )}
          {isPayments &&
            !paymentList && (
              <>
                <OverviewChart
                  categoryType={categoryType}
                  data={pieData}
                  onCategoryClick={onCategoryClick}
                  onCategoryTypeChange={onCategoryTypeChange}
                  onPeriodChange={onPeriodChange}
                  period={period}
                  periods={periods}
                  size={size}
                />
                <Footer
                  paymentCount={entriesCount}
                  categoryCount={small ? null : categoryCount}
                  onSeeAllClick={onSeeAllClick}
                />
              </>
            )}
        </div>
        {isStories && <Stories />}
        {isAbout && <div>TODO</div>}
      </div>
    )
  }
}

Widget.propTypes = {
  barsHeight: PropTypes.func,
  categoryCount: PropTypes.number,
  categoryType: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired, // TODO: move size logic out
  stories: PropTypes.element,
  tab: PropTypes.oneOf(['payments', 'stories', 'about']),
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
