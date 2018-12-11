// @flow strict-local
import React from 'react'
import Widget from 'containers/widgets/Widget'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonWidgetExpander from './ButtonWidgetExpander'
import ButtonWidgetCategoryList from './ButtonWidgetCategoryList'

const WIDTH = 375

const styles = theme => ({
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

type Props = {|
  ...InjectStylesProps,
  //
  expanded?: boolean, // demo flag
|}

const ButtonWidget = ({ classes, expanded }: Props) => (
  <ButtonWidgetExpander open={expanded} width={WIDTH}>
    <Widget
      barsFooterPadding={12}
      barsHeight={196}
      barsWidth={337}
      CategoryList={ButtonWidgetCategoryList}
      className={classes.root}
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
  </ButtonWidgetExpander>
)

export default injectStyles(styles)(ButtonWidget)
