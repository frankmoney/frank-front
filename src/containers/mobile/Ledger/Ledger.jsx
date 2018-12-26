// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { branch, compose, renderComponent, lifecycle } from 'recompose'
import AreaSpinner from 'components/AreaSpinner'
import FrankLogo from 'components/Layout/FrankLogo.svg'
import {
  pieItemsSelector,
  pieTotalSelector,
  spendingSelector,
  revenueSelector,
  nameSelector,
  isLoadingSelector,
} from 'containers/public/Ledger/selectors'
import OverviewPieChart, {
  type PieChartCategories,
} from 'components/OverviewPieChart'
import CategoryList from 'containers/widgets/ButtonWidget/ButtonWidgetCategoryList'
import * as ACTIONS from 'containers/public/Ledger/actions'
import Totals from 'containers/widgets/Totals'
import type { PieTotal } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import reconnect from 'utils/reconnect'

const PADDING = 20

const styles = theme => ({
  mobileSized: {
    // debug wrapper
    width: 375,
    margin: [20, 'auto'],
    boxShadow: [0, 0, 0, 1, 'black'],
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    color: '#D3D5D9',
    width: 60,
    margin: [20, PADDING, 0, 'auto'],
  },
  title: {
    ...theme.fontSemibold(40, 42),
    textAlign: 'center',
    padding: [0, PADDING],
    margin: [45, 0, 0],
  },
  stats: {
    margin: [22, 0, 0],
    textAlign: 'center',
  },
  statItem: {
    '&:first-child': {
      paddingLeft: PADDING,
    },
    '&:last-child': {
      paddingRight: PADDING,
    },
  },
  tabs: {
    margin: [45, 0, 0],
    textAlign: 'center',
  },
  pieChart: {
    margin: [37, 'auto', 0],
  },
  paymentsSummary: {
    ...theme.fontRegular(18, 26),
    margin: [37, 20, 0],
  },
  categoryList: {
    margin: [14, 0, 0],
    padding: [0, 20],
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  accountId: number | string,
  accountName: string,
  pieItems: PieChartCategories,
  pieTotal: PieTotal,
  revenue: number,
  spending: number,
|}

const Ledger = ({
  accountName,
  classes,
  pieItems,
  pieTotal,
  revenue,
  spending,
}: Props) => (
  <div className={cx(classes.root, classes.mobileSized)}>
    <FrankLogo className={classes.logo} />
    <h1 className={classes.title}>{accountName}</h1>
    <Totals
      className={classes.stats}
      itemClassName={classes.statItem}
      income={revenue}
      spending={spending}
    />
    <div className={classes.tabs}>TODO: tabs</div>
    <OverviewPieChart
      CategoryList={<CategoryList className={classes.categoryList} />}
      chartSize={270}
      chartClassName={classes.pieChart}
      component={React.Fragment}
      data={pieItems}
      pieTotal={pieTotal}
      pieTotalSelectable={false}
    />
    <div className={classes.paymentsSummary}>TODO: payments summary</div>
  </div>
)

export default compose(
  reconnect(
    {
      accountName: nameSelector,
      loading: isLoadingSelector,
      pieItems: pieItemsSelector,
      pieTotal: pieTotalSelector,
      revenue: revenueSelector,
      spending: spendingSelector,
    },
    {
      load: ACTIONS.load,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load({ accountId: this.props.accountId })
      }
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Ledger)
