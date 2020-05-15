// @flow strict-local
import React from 'react'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Totals from 'components/widgets/Totals/index'
import AboutTab from 'components/widgets/Tabs/AboutTab'
import OverviewTab, {
  type WidgetWidth,
} from 'components/widgets/Tabs/OverviewTab'
import PaymentsSummary from 'components/common/PaymentsSummary/index'
import ErrorScreen from 'components/widgets/ErrorScreen'
import Widget, { type WidgetAPI } from 'components/widgets/Widget'
import ButtonWidgetCategoryList from './ButtonWidgetCategoryList'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
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
    height: '100%',
    paddingTop: 10,
  },
  pieChart: {
    margin: [15, 'auto'],
    position: 'relative',
  },
  paymentsSummary: {
    flex: [1, 0, 'auto'],
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
  barchart: {
    margin: [8, 'auto', 20],
  },
}

type Props = {|
  ...InjectStylesProps,
  // Public API
  ...WidgetAPI,
  open?: boolean,
  width: WidgetWidth,
|}

class ButtonWidgetEmbed extends React.Component<Props> {
  renderAboutTab = props => (
    <AboutTab
      titleClassName={this.props.classes.aboutTitle}
      totalsClassName={this.props.classes.aboutTotals}
      {...props}
    />
  )

  renderError = cause => (
    <ErrorScreen cause={cause} className={this.props.classes.root} />
  )

  render() {
    const { accountId, classes, width } = this.props
    return (
      <Widget
        accountId={accountId}
        barChartClassName={classes.barchart}
        barsFooterPadding={12}
        barsHeight={196}
        barsWidth={337}
        className={classes.root}
        OverviewTab={
          <OverviewTab
            CategoryList={ButtonWidgetCategoryList}
            className={classes.content}
            noHover
            pieChartClassName={classes.pieChart}
            pieChartRootComponent={React.Fragment}
            showPieChart
            showTotals
            widgetWidth={width}
          />
        }
        paymentListClassName={classes.payments}
        paymentsPeriodClassName={classes.period}
        paymentsRootClassName={classes.content}
        PaymentsSummary={
          <PaymentsSummary className={classes.paymentsSummary} large />
        }
        renderAboutTab={this.renderAboutTab}
        renderErrorScreen={this.renderError}
        showBarChart
        showCategoryCount
        Totals={
          <Totals className={classes.stats} itemClassName={classes.statsItem} />
        }
      />
    )
  }
}

export default injectStyles(styles)(ButtonWidgetEmbed)
