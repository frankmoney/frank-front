import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import Bar from 'components/Charts/Bar'
import PeriodSelector from 'containers/PieChart/PeriodSelector'
import { Header, HeaderItem, CategoryName } from './Header'
import OverviewChart from './Chart'
import {
  barChartDataSelector,
  currentCategoryNameSelector,
  entriesCountSelector,
  periodSelector,
  pieChartDataSelector,
} from './selectors'

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    background: '#FFFFFF',
    border: '1px solid #E9EAEC',
    borderRadius: 8,
    color: colors.black,
    display: 'flex',
    flexDirection: 'column',
    padding: [0, 18, 19],
  },
  size400: {
    width: 400,
    height: 275,
  },
  size500: {
    width: 500,
    height: 345,
  },
  size625: {
    width: 625,
    height: 430,
  },
  size800: {
    height: 550,
    minHeight: 550,
    width: 800,
  },
  paymentsPeriodSelect: {
    display: 'flex',
    marginTop: 4,
  },
  barChart: {
    margin: [10, 'auto', 0],
    '$size500 &': {
      margin: [10, -3, 0],
    },
  },
})

const barsHeight = R.cond([
  [R.equals(500), R.always(146)],
  [R.equals(625), R.always(198)],
  [R.equals(800), R.always(203)],
  [R.T, R.always(0)],
])

class InlineWidget extends React.PureComponent {
  state = {
    tab: this.props.tab,
    paymentList: this.props.paymentList,
  }

  switchTab = tab => () => this.setState({ tab })

  render() {
    const {
      barsData,
      classes,
      className,
      currentCategoryName,
      entriesCount,
      stories: Stories,
      period,
      pieData,
      size,
    } = this.props
    const { tab, paymentList } = this.state

    const isPayments = tab === 'payments'
    const isStories = tab === 'stories'
    const isAbout = tab === 'about'

    return (
      <div
        className={cx(
          classes.root,
          {
            [classes.size400]: size === 400,
            [classes.size500]: size === 500,
            [classes.size625]: size === 625,
            [classes.size800]: size === 800,
          },
          className
        )}
      >
        {paymentList && (
          <Header live={false}>
            <CategoryName name={currentCategoryName} />
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
        {isPayments &&
          paymentList &&
          size > 400 && (
            <>
              <PeriodSelector
                className={cx(classes.paymentsPeriodSelect)}
                // onChange={this.handleChangePeriod}
                value={period}
              />
              <Bar
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
        {isPayments &&
          !paymentList && (
            <OverviewChart
              entriesCount={entriesCount}
              period={period}
              pieData={pieData}
              size={size}
            />
          )}
        {isStories && <Stories />}
        {isAbout && <div>TODO</div>}
      </div>
    )
  }
}

InlineWidget.propTypes = {
  paymentList: PropTypes.bool,
  period: PropTypes.string,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
  stories: PropTypes.element,
  tab: PropTypes.oneOf(['payments', 'stories', 'about']),
}

InlineWidget.defaultProps = {
  paymentList: false,
  tab: 'payments',
}

const mapStateToProps = createStructuredSelector({
  barsData: barChartDataSelector,
  currentCategoryName: currentCategoryNameSelector,
  entriesCount: entriesCountSelector,
  period: periodSelector,
  pieData: pieChartDataSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(InlineWidget)
