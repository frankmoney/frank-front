import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import Widget from '../Widget'
import Expander from './Expander'
import ButtonWidgetCategoryList from './ButtonWidgetCategoryList'

const WIDTH = 375

const styles = theme => ({
  // Wrapper
  root: {
    ...theme.fontRegular(16, 26),
    background: '#FFFFFF',
    border: '1px solid #fff',
    borderRadius: 8,
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
    color: colors.black,
    display: 'flex',
    flexDirection: 'column',
    height: 720,
    padding: [0, 18, 59],
    position: 'relative',
    width: WIDTH,
  },
  expender: {
    margin: [0, -1],
    width: WIDTH,
  },
  // Actual widget content
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  period: {
    display: 'flex',
    padding: [4, 0, 11, 2],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: [0, -15],
    overflowY: 'scroll',
    padding: [0, 15],
  },
  pieChart: {
    margin: [15, 'auto'],
    position: 'relative',
  },
  overviewFooter: {
    ...theme.fontRegular(18, 26),
    margin: [18, 0, 13],
  },
  overviewFooterSeeAll: {
    flexGrow: 1,
    marginRight: -2,
    textAlign: 'right',
  },
  payments: {
    margin: [-3, -9, 0],
  },
})

class ButtonWidget extends React.PureComponent {
  state = {
    expanded: this.props.expanded,
  }

  handleClose = () => this.setState({ expanded: false })
  handleOpen = () => this.setState({ expanded: true })

  render() {
    const { classes, className } = this.props
    const { expanded } = this.state

    if (!expanded) {
      return (
        <Expander
          closed
          onClick={this.handleOpen}
          title="We’re transparent"
          subtitle="See realtime report"
        />
      )
    }

    return (
      <div className={cx(classes.root, className)}>
        <Widget
          barsFooterPadding={12}
          barsHeight={196}
          barsWidth={337}
          CategoryList={ButtonWidgetCategoryList}
          className={classes.contentRoot}
          contentClassName={classes.content}
          OverviewFooterClasses={{
            root: classes.overviewFooter,
            seeAll: classes.overviewFooterSeeAll,
          }}
          OverviewFooterProps={{
            hideIcon: true,
            hideVerifiedBy: true,
          }}
          paymentListClassName={classes.payments}
          paymentsPeriodClassName={classes.period}
          pieChartClassName={classes.pieChart}
          pieChartRootComponent={React.Fragment}
          showBarChart
          showCategoryCount
          showOverviewTotals
          widgetSize={WIDTH}
        />
        <Expander className={classes.expender} onClose={this.handleClose} />
      </div>
    )
  }
}

ButtonWidget.propTypes = {
  expanded: PropTypes.bool, // demo flag
}

export default injectStyles(styles)(ButtonWidget)
