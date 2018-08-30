import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import { Header, HeaderItem, CategoryName } from './Header'
import {
  currentCategoryNameSelector,
  entriesCountSelector,
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
    justifyContent: 'space-between',
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
})

class InlineWidget extends React.PureComponent {
  state = {
    tab: this.props.tab,
    paymentList: this.props.paymentList,
  }

  switchTab = tab => () => this.setState({ tab })

  render() {
    const {
      classes,
      className,
      currentCategoryName,
      entriesCount,
      stories: Stories,
      charts: Charts,
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
        {isPayments && (
          <Charts
            entriesCount={entriesCount}
            period="All time"
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
  charts: PropTypes.element,
  paymentList: PropTypes.bool,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
  stories: PropTypes.element,
  tab: PropTypes.oneOf(['payments', 'stories', 'about']),
}

InlineWidget.defaultProps = {
  paymentList: false,
  tab: 'payments',
}

const mapStateToProps = createStructuredSelector({
  entriesCount: entriesCountSelector,
  pieData: pieChartDataSelector,
  currentCategoryName: currentCategoryNameSelector,
})

export default compose(
  connect(mapStateToProps),
  injectStyles(styles)
)(InlineWidget)
