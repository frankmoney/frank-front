// @flow strict-local
// flowlint unsafe-getters-setters:off
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import PaymentsSummary from 'components/common/PaymentsSummary'
import Totals from 'components/widgets/Totals'
import { type AccountId } from 'data/models/account'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { between } from '../utils'
import AboutTab from '../Tabs/AboutTab'
import OverviewTab, {
  type WidgetWidth,
  type DynamicSizeFn,
} from '../Tabs/OverviewTab'
import StoriesTab from '../Tabs/StoriesTab'
import ErrorScreen from '../ErrorScreen'
import Widget from '../Widget'

const PADDING = 15
const MAX_CONTENT_WIDTH = 585

const clampedWidgetWidth: DynamicSizeFn = width => (width < 280 ? 280 : width)

const widgetHeight: DynamicSizeFn = R.pipe(
  clampedWidgetWidth,
  R.cond([
    [between(280, 400), R.multiply(R.__, 0.6785)],
    [between(400, 500), R.multiply(R.__, 0.6875)],
    [between(500, 625), R.multiply(R.__, 0.69)],
    [between(625, 800), R.multiply(R.__, 0.688)],
    [R.gte(R.__, 800), R.multiply(R.__, 0.6875)],
  ])
)

const overviewWidth = R.cond([
  [R.lt(R.__, 500), R.always(0)], // no pie at this size
  [between(500, 625), R.always(460)],
  [between(625, 800), R.always(585)],
  [R.gte(R.__, 800), R.always(760)],
])

const pieMargin = R.cond([
  [R.lt(R.__, 500), R.always(0)], // no pie at this size
  [between(500, 625), R.always([[0, 35, 0, 5]])],
  [between(625, 800), R.always([[0, 53]])],
  [R.gte(R.__, 800), R.always([[0, 55, 0, 86]])],
])

const barsHeight: DynamicSizeFn = R.cond([
  [R.lt(R.__, 500), R.always(0)], // no bars at this size
  [between(500, 625), R.always(146)],
  [between(625, 800), R.always(198)],
  [R.gte(R.__, 800), R.always(203)],
])

const barsWidth: DynamicSizeFn = width => (width > 500 ? 516 : 468)

const styles = theme => ({
  root: {
    background: '#FFF',
    border: '1px solid #E9EAEC',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: ({ width }) => clampedWidgetWidth(width),
    height: ({ width, height }) => height || widgetHeight(width),
  },
  disableOutline: {
    borderRadius: 0,
    border: 'none',
  },
  widget: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: 1,
    padding: [0, 18, 19],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: [0, -PADDING],
    padding: [0, PADDING],
    position: 'relative',
    overflow: 'hidden',
  },
  scrollable: {
    overflowY: 'auto',
  },
  barChart: {
    margin: [10, 'auto', 0],
  },
  payments: {
    margin: [-5, -8, 0],
    width: 'auto',
  },
  noBarChart: {
    margin: [4, -8, 0],
  },
  smallPayments: {
    marginTop: 8,
    fontSize: 16,
  },
  paymentsCapped: {
    margin: [-5, 'auto', 0],
    width: 550,
  },
  overview: {
    width: ({ width }) => overviewWidth(width),
    margin: [0, 'auto'],
  },
  pieChart: {
    margin: ({ width }) => pieMargin(width),
  },
  paymentsSummary: {
    flex: 0,
  },
  smallSummary: {
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: [0, -1],
    justifyContent: 'space-between',
    minHeight: 55,
  },
  capped: {
    maxWidth: MAX_CONTENT_WIDTH,
    margin: [0, 'auto'],
  },
  story: {
    boxShadow: [0, 0, 4, 'rgba(0, 0, 0, 0.1)'],
    borderRadius: 5,
    padding: [17, 23],
  },
  smallStory: {
    padding: [15, 16],
  },
  smallStoryTitle: {
    fontSize: 18,
  },
  smallStoryStats: {
    fontSize: 14,
    whiteSpace: 'nowrap',
  },
  smallStoryStatsSymbol: {
    width: 18,
    height: 18,
    margin: [-2, 2, 0, -6],
  },
  storyImage: {
    margin: [-17, -23, 12],
  },
  aboutTitle: {
    ...theme.fontSemibold(32, 40),
  },
  aboutTotals: {
    ...theme.fontRegular(20, 26),
    maxWidth: 400,
    '& > :not(:first-child)': {
      paddingLeft: 14,
    },
  },
  aboutDescription: {
    ...theme.fontRegular(20, 30),
    marginTop: 17,
  },
  smallAboutTitle: {
    ...theme.fontSemibold(22, 40),
    marginTop: -3,
  },
  smallAboutTotals: {
    ...theme.fontRegular(18, 24),
    marginTop: 7,
    maxWidth: 400,
    '& > :not(:first-child)': {
      paddingLeft: 14,
    },
  },
  smallAboutDescription: {
    ...theme.fontRegular(18, 28),
    marginTop: 17,
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  accountId: AccountId,
  width: WidgetWidth,
|}

class InlineWidget extends React.Component<Props> {
  get clampedWidth() {
    return clampedWidgetWidth(this.props.width)
  }

  get isLarge() {
    return this.clampedWidth >= 625
  }

  get isSmall() {
    return this.clampedWidth < 400
  }

  renderError = cause => (
    <ErrorScreen
      cause={cause}
      className={this.props.classes.widget}
      size={this.isSmall ? 'small' : this.isLarge ? 'large' : 'medium'}
    />
  )

  renderAboutTab = props => {
    const { classes } = this.props
    return (
      <AboutTab
        className={cx({
          [classes.capped]: this.isLarge,
        })}
        descriptionClassName={cx(classes.aboutDescription, {
          [classes.smallAboutDescription]: this.isSmall,
        })}
        multilineTotals={this.isSmall}
        titleClassName={cx(classes.aboutTitle, {
          [classes.smallAboutTitle]: this.isSmall,
        })}
        totalsClassName={cx(classes.aboutTotals, {
          [classes.smallAboutTotals]: this.isSmall,
        })}
        {...props}
      />
    )
  }

  renderStoriesTab = stories => {
    const { classes } = this.props
    return (
      <StoriesTab
        stories={stories}
        className={cx({ [classes.capped]: this.isLarge })}
        storyClassName={cx(classes.story, {
          [classes.smallStory]: this.isSmall,
        })}
        storyImageBorderRadius={[[5, 5, 0, 0]]}
        storyImageClassName={classes.storyImage}
        storyTitleClassName={cx({ [classes.smallStoryTitle]: this.isSmall })}
        storyStatsClassName={cx({ [classes.smallStoryStats]: this.isSmall })}
        storySymbolClassName={cx({
          [classes.smallStoryStatsSymbol]: this.isSmall,
        })}
      />
    )
  }

  render() {
    const { accountId, classes, disableOutline } = this.props
    const light = this.clampedWidth < 500
    return (
      <div
        className={cx(classes.root, disableOutline && classes.disableOutline)}
      >
        <Widget
          accountId={accountId}
          barChartClassName={classes.barChart}
          barsFooterPadding={10}
          barsHeight={barsHeight(this.clampedWidth)}
          barsWidth={barsWidth(this.clampedWidth)}
          className={classes.widget}
          OverviewTab={
            <OverviewTab
              className={cx(classes.content, { [classes.scrollable]: light })}
              chartClassName={classes.overview}
              noHover
              pieClassName={classes.pieChart}
              showPieChart={!light}
              small={this.isSmall}
              widgetWidth={this.clampedWidth}
            />
          }
          paymentListClassName={cx(classes.payments, {
            [classes.noBarChart]: light,
            [classes.smallPayments]: this.isSmall,
            [classes.paymentsCapped]: this.isLarge,
          })}
          paymentsRootClassName={cx(classes.content, classes.scrollable)}
          PaymentsSummary={
            <PaymentsSummary
              className={cx({
                [classes.paymentsSummary]: !light,
                [classes.smallSummary]: this.isSmall,
              })}
              showIcon
              showVerified
            />
          }
          renderAboutTab={this.renderAboutTab}
          renderErrorScreen={this.renderError}
          renderStoriesTab={this.renderStoriesTab}
          showBarChart={!light}
          showCategoryCount={!light}
          small={this.isSmall}
          Totals={
            <Totals
              className={classes.stats}
              itemClassName={classes.statsItem}
            />
          }
        />
      </div>
    )
  }
}

export default injectStyles(styles)(InlineWidget)
