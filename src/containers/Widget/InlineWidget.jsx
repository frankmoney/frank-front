import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import Widget from './Widget'

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
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: [0, -15],
    padding: [0, 15],
    '$size400 &': {
      overflowY: 'scroll',
    },
  },
  paymentsPeriodSelect: {
    marginTop: 4,
    paddingLeft: 2,
    textAlign: 'left',
  },
  barChart: {
    margin: [10, 'auto', 0],
    '$size500 &': {
      margin: [10, -3, 0],
    },
  },
  payments: {
    margin: [-5, 'auto', 0],
    width: 550,
    '$size400 &': {
      margin: [4, -8, 0],
      width: 'auto',
    },
    '$size500 &': {
      margin: [-5, -8, 0],
      width: 'auto',
    },
  },
})

const barsHeight = R.cond([
  [R.equals(500), R.always(146)],
  [R.equals(625), R.always(198)],
  [R.equals(800), R.always(203)],
  [R.T, R.always(0)],
])

const InlineWidget = ({ classes, size }) => (
  <Widget
    className={cx(classes.root, {
      [classes.size400]: size === 400,
      [classes.size500]: size === 500,
      [classes.size625]: size === 625,
      [classes.size800]: size === 800,
    })}
    barChartClassName={classes.barChart}
    barsFooterPadding={10}
    barsHeight={barsHeight(size)}
    barsWidth={size > 500 ? 516 : 468}
    contentClassName={classes.content}
    paymentListClassName={classes.payments}
    paymentsPeriodClassName={classes.paymentsPeriodSelect}
    showBarChart={size > 400}
    showCategoryCount={size > 400}
    widgetSize={size}
  />
)

InlineWidget.propTypes = {
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
}

export default injectStyles(styles)(InlineWidget)
