// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { branch, compose, renderComponent, lifecycle } from 'recompose'
import LedgerIcon from 'material-ui-icons/ChromeReaderMode'
import StoriesIcon from 'material-ui-icons/BurstMode'
import AreaSpinner from 'components/AreaSpinner'
import FrankLogo from 'components/Layout/FrankLogo.svg'
import { TextButton } from 'components/kit/Button'
import PaymentsSummary from 'components/common/PaymentsSummary'
import TimelineChart from 'components/common/TimelineChart'
import { type BarData } from 'components/Charts/Bar'
import {
  barChartDataSelector,
  categoryCountSelector,
  descriptionSelector,
  isLoadingSelector,
  nameSelector,
  paymentCountSelector,
  pieItemsSelector,
  pieTotalSelector,
  revenueSelector,
  spendingSelector,
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
import CheckboxButton from './CheckboxButton'

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
  description: {
    ...theme.fontRegular(18, 30),
    color: '#515569',
    margin: [27, 20, 0],
    textAlign: 'center',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: [32, 'auto', 0],
    textAlign: 'center',
    width: 245,
  },
  overviewContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  pieChart: {
    margin: [37, 'auto', 0],
  },
  paymentsSummary: {
    ...theme.fontRegular(18, 26),
    margin: [35, 17, 0],
  },
  categoryList: {
    margin: [14, 0, 0],
    padding: [0, 20],
    order: '',
  },
  barChart: {
    margin: [26, 'auto', 0],
  },
  barCheckboxes: {
    marginBottom: 40,
  },
  barCheckbox: {
    flex: [1, 0],
    '&:first-child': {
      marginRight: 20,
    },
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  accountId: number | string,
  barData: BarData,
  accountName: string,
  categoryCount?: number,
  description: ?string,
  paymentCount: number,
  pieItems: PieChartCategories,
  pieTotal: PieTotal,
  revenue: number,
  spending: number,
|}

const Ledger = ({
  accountName,
  barData,
  categoryCount,
  classes,
  description,
  paymentCount,
  pieItems,
  pieTotal,
  revenue,
  spending,
}: Props) => {
  const timelineWidth = 335 // TODO: calculate from the real size
  return (
    <div className={cx(classes.root, classes.mobileSized)}>
      <FrankLogo className={classes.logo} />
      <h1 className={classes.title}>{accountName}</h1>
      <Totals
        className={classes.stats}
        itemClassName={classes.statItem}
        income={revenue}
        spending={spending}
      />
      {description && <div className={classes.description}>{description}</div>}
      <div className={classes.tabs}>
        <TextButton icon={<LedgerIcon />} color="blue" larger label="Ledger" />
        <TextButton icon={<StoriesIcon />} larger label="Stories" />
      </div>
      <div className={classes.overviewContainer}>
        <OverviewPieChart
          CategoryList={<CategoryList className={classes.categoryList} />}
          chartSize={270}
          chartClassName={classes.pieChart}
          component={React.Fragment}
          data={pieItems}
          pieTotal={pieTotal}
          pieTotalSelectable={false}
        />
        <PaymentsSummary
          className={classes.paymentsSummary}
          categoryCount={categoryCount}
          onLinkClick={() => console.log('see all')}
          paymentCount={paymentCount}
        />
      </div>
      <TimelineChart
        CheckboxComponent={CheckboxButton}
        Mixins={{
          checkboxes: classes.barCheckboxes,
          checkbox: classes.barCheckbox,
        }}
        className={classes.barChart}
        data={barData}
        width={timelineWidth}
        height={220}
      />
    </div>
  )
}

export default compose(
  reconnect(
    {
      accountName: nameSelector,
      barData: barChartDataSelector,
      categoryCount: categoryCountSelector,
      description: descriptionSelector,
      loading: isLoadingSelector,
      paymentCount: paymentCountSelector,
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
