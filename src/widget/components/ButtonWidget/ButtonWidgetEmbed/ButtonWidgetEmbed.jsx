// @flow strict-local
import React from 'react'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Totals from 'containers/widgets/Totals/index'
import AboutTab from 'containers/widgets/Tabs/AboutTab'
import OverviewTab, {
  type ButtonWidgetSize,
} from 'containers/widgets/Tabs/OverviewTab'
import StoriesTab from 'containers/widgets/Tabs/StoriesTab'
import PaymentsSummary from 'components/common/PaymentsSummary/index'
import Widget, { type WidgetAPI } from 'containers/widgets/Widget'
import ButtonWidgetCategoryList from './ButtonWidgetCategoryList'

const WIDTH: ButtonWidgetSize = 375

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

const ButtonWidgetEmbed = ({ accountId, classes }: Props) => (
  <Widget
    AboutTab={
      <AboutTab
        titleClassName={classes.aboutTitle}
        totalsClassName={classes.aboutTotals}
      />
    }
    accountId={accountId}
    barsFooterPadding={12}
    barsHeight={196}
    barsWidth={337}
    className={classes.root}
    OverviewTab={
      <OverviewTab
        CategoryList={ButtonWidgetCategoryList}
        className={classes.content}
        pieChartClassName={classes.pieChart}
        pieChartRootComponent={React.Fragment}
        showTotals
        widgetSize={WIDTH}
      />
    }
    paymentListClassName={classes.payments}
    paymentsPeriodClassName={classes.period}
    paymentsRootClassName={classes.content}
    PaymentsSummary={
      <PaymentsSummary className={classes.paymentsSummary} large />
    }
    showBarChart
    showCategoryCount
    StoriesTab={<StoriesTab />}
    Totals={
      <Totals className={classes.stats} itemClassName={classes.statsItem} />
    }
  />
)

export default injectStyles(styles)(ButtonWidgetEmbed)
