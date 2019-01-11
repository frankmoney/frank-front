// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Totals from 'containers/widgets/Totals/index'
import PaymentsSummary from 'components/common/PaymentsSummary/index'
import Widget, { type WidgetAPI } from '../../../../containers/widgets/Widget'
import ButtonWidgetCategoryList from './ButtonWidgetCategoryList'

const styles = {
  root: {
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
  paymentsSummary: {
    margin: [16, 0, 13],
  },
  payments: {
    margin: [-3, -9, 0],
  },
  stats: {
    margin: [2, -15, 22],
  },
  statsItem: {
    paddingLeft: 15,
  },
}

type Props = {|
  ...InjectStylesProps,
  // Public API
  ...WidgetAPI,
  open?: boolean,
|}

const ButtonWidgetEmbed = ({ width, accountId, className, classes }: Props) => (
  <Widget
    accountId={accountId}
    barsFooterPadding={12}
    barsHeight={196}
    barsWidth={width - 40}
    CategoryList={ButtonWidgetCategoryList}
    className={cx(classes.root, className)}
    contentClassName={classes.content}
    PaymentsSummary={<PaymentsSummary className={classes.paymentsSummary} />}
    paymentListClassName={classes.payments}
    paymentsPeriodClassName={classes.period}
    pieChartClassName={classes.pieChart}
    pieChartRootComponent={React.Fragment}
    showBarChart
    showCategoryCount
    Totals={
      <Totals className={classes.stats} itemClassName={classes.statsItem} />
    }
    widgetSize={width}
  />
)

export default injectStyles(styles)(ButtonWidgetEmbed)
