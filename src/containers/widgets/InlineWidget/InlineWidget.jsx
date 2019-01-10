// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PaymentsSummary from 'components/common/PaymentsSummary'
import Totals from 'containers/widgets/Totals'
import { type AccountId } from 'data/models/account'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import OverviewTab, { type InlineWidgetSize } from '../Tabs/OverviewTab'
import Widget from '../Widget'

const PADDING = 15

const styles = {
  root: {
    background: '#FFF',
    border: '1px solid #E9EAEC',
    borderRadius: 8,
    display: 'flex',
    position: 'relative',
  },
  widget: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: [0, 18, 19],
  },
  size280: {
    width: 280,
    height: 190,
    '& $content': {
      overflowY: 'scroll',
    },
  },
  size400: {
    width: 400,
    height: 275,
    '& $content': {
      overflowY: 'scroll',
    },
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
    margin: [0, -PADDING],
    padding: [0, PADDING],
    position: 'relative',
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
  pieChart: {
    '$size500 &': {
      margin: [0, 35, 0, 5],
    },
    '$size625 &': {
      margin: [0, 53],
    },
    '$size800 &': {
      margin: [0, 55, 0, 86],
    },
  },
  paymentsSummary: {
    flex: 0,
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  accountId: AccountId,
  size: InlineWidgetSize,
|}

const barsHeight = R.cond([
  [R.equals(500), R.always(146)],
  [R.equals(625), R.always(198)],
  [R.equals(800), R.always(203)],
  [R.T, R.always(0)],
])

const InlineWidget = ({ accountId, classes, size }: Props) => (
  <div
    className={cx(classes.root, {
      [classes.size280]: size === 280,
      [classes.size400]: size === 400,
      [classes.size500]: size === 500,
      [classes.size625]: size === 625,
      [classes.size800]: size === 800,
    })}
  >
    <Widget
      accountId={accountId}
      barChartClassName={classes.barChart}
      barsFooterPadding={10}
      barsHeight={barsHeight(size)}
      barsWidth={size > 500 ? 516 : 468}
      className={classes.widget}
      OverviewTab={
        <OverviewTab
          className={classes.content}
          pieClassName={classes.pieChart}
          widgetSize={size}
        />
      }
      paymentListClassName={classes.payments}
      paymentsRootClassName={classes.content}
      PaymentsSummary={
        <PaymentsSummary
          className={cx({ [classes.paymentsSummary]: size > 400 })}
          showIcon
          showVerified
        />
      }
      showBarChart={size > 400}
      showCategoryCount={size > 400}
      Totals={
        <Totals className={classes.stats} itemClassName={classes.statsItem} />
      }
    />
  </div>
)

export default injectStyles(styles)(InlineWidget)
