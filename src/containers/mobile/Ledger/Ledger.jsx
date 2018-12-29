// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { branch, compose, renderComponent, lifecycle } from 'recompose'
import LedgerIcon from 'material-ui-icons/ChromeReaderMode'
import StoriesIcon from 'material-ui-icons/BurstMode'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import FixedHeader from 'components/public/Header'
import AreaSpinner from 'components/AreaSpinner'
import FrankLogo from 'components/Layout/FrankLogo.svg'
import { IconPlainButton, TextButton } from 'components/kit/Button'
import PaymentsSummary from 'components/common/PaymentsSummary'
import TimelineChart from 'components/common/TimelineChart'
import { type BarData } from 'components/Charts/Bar'
import {
  barChartColorSelector,
  barChartDataSelector,
  barChartOnlySelector,
  categoryCountSelector,
  currentCategoryIdSelector,
  currentCategoryNameSelector,
  descriptionSelector,
  isLoadingSelector,
  loadedSelector,
  nameSelector,
  paymentCountSelector,
  paymentsSelector,
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
import { type Payment } from 'data/models/payment'
import { type PieTotal } from 'data/models/pieData'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import reconnect from 'utils/reconnect'
import { ALL_CATEGORIES } from 'const'
import { createPaymentClickHandler, type WithHistoryProps } from '../utils'
import CheckboxButton from './CheckboxButton'
import Payments from './MobilePayments'

const PADDING = 20

const styles = theme => ({
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
  payments: {
    margin: [12, 0, 0],
  },
  withFixedHeader: {
    paddingTop: 65,
  },
  fixedHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 83,
    padding: [20, 0, 23],
  },
  fixedHeaderScrolled: {
    height: 65,
    padding: [13, 0, 15],
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
  headerArrow: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  headerAccountName: {
    ...theme.fontRegular(15),
    color: '#9295A1',
  },
  headerCategoryName: {
    ...theme.fontMedium(18),
    color: ({ currentCategoryColor }) => currentCategoryColor,
  },
})

type Category = {
  name: string,
  id: string | number,
  color: string,
}

type Props = {|
  ...InjectStylesProps,
  ...WithHistoryProps,
  //
  accountId: number | string,
  accountName: string,
  barData: BarData,
  categoryCount?: number,
  currentCategoryColor: ?string,
  currentCategoryId: ?string,
  currentCategoryName: ?string,
  description: ?string,
  isPaymentsPage: boolean,
  onCancelCategory: () => void,
  onCategoryClick: Category => void,
  paymentCount: number,
  payments: Array<Payment>,
  pieItems: PieChartCategories,
  pieTotal: PieTotal,
  revenue: number,
  spending: number,
|}

const Ledger = ({
  accountId,
  accountName,
  barData,
  categoryCount,
  className,
  currentCategoryColor,
  currentCategoryId,
  currentCategoryName,
  classes,
  description,
  isPaymentsPage,
  onCancelCategory,
  onCategoryClick,
  paymentCount,
  payments,
  pieItems,
  pieTotal,
  revenue,
  spending,
  //
  history,
}: Props) => {
  const handleCategoryClick = category => {
    window.scrollTo(0, 0)
    onCategoryClick(category)
  }

  const handlePaymentClick = createPaymentClickHandler(accountId, history)

  const timelineWidth = 335 // TODO: calculate from the real size?
  const showCategories =
    currentCategoryId === ALL_CATEGORIES.id || currentCategoryId === null
  const barsColor =
    currentCategoryId === ALL_CATEGORIES.id ? null : currentCategoryColor

  return (
    <div
      className={cx(
        classes.root,
        {
          [classes.withFixedHeader]: isPaymentsPage,
        },
        className
      )}
    >
      {!isPaymentsPage && (
        <>
          <FrankLogo className={classes.logo} />
          <h1 className={classes.title}>{accountName}</h1>
          <Totals
            className={classes.stats}
            itemClassName={classes.statItem}
            income={revenue}
            spending={spending}
          />
          {description && (
            <div className={classes.description}>{description}</div>
          )}
          <div className={classes.tabs}>
            <TextButton
              icon={<LedgerIcon />}
              color="blue"
              larger
              label="Ledger"
            />
            <TextButton icon={<StoriesIcon />} larger label="Stories" />
          </div>
        </>
      )}
      {isPaymentsPage && (
        <FixedHeader
          className={cx(classes.fixedHeader, classes.mobileSized)}
          scrolledClassName={classes.fixedHeaderScrolled}
        >
          <IconPlainButton
            className={classes.headerArrow}
            icon={<ArrowBackIcon />}
            onClick={onCancelCategory}
          />
          <span className={classes.headerAccountName}>{accountName}</span>
          <span className={classes.headerCategoryName}>
            {currentCategoryName}
          </span>
        </FixedHeader>
      )}
      {!isPaymentsPage && (
        <div className={classes.overviewContainer}>
          <OverviewPieChart
            CategoryList={<CategoryList className={classes.categoryList} />}
            chartSize={270}
            chartClassName={classes.pieChart}
            component={React.Fragment}
            data={pieItems}
            mobile
            onCategoryClick={handleCategoryClick}
            pieTotal={pieTotal}
            pieTotalSelectable={false}
          />
          <PaymentsSummary
            className={classes.paymentsSummary}
            categoryCount={categoryCount}
            onLinkClick={() => handleCategoryClick(ALL_CATEGORIES)}
            paymentCount={paymentCount}
          />
        </div>
      )}
      <TimelineChart
        CheckboxComponent={CheckboxButton}
        Mixins={{
          checkboxes: classes.barCheckboxes,
          checkbox: classes.barCheckbox,
        }}
        barsColor={barsColor}
        className={classes.barChart}
        data={barData}
        mobile
        width={timelineWidth}
        height={220}
      />
      <Payments
        className={classes.payments}
        onPaymentClick={handlePaymentClick}
        paymentsData={payments}
        showCategories={showCategories}
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
      currentCategoryColor: barChartColorSelector,
      currentCategoryId: currentCategoryIdSelector,
      currentCategoryName: currentCategoryNameSelector,
      description: descriptionSelector,
      isPaymentsPage: barChartOnlySelector,
      loaded: loadedSelector,
      loading: isLoadingSelector,
      paymentCount: paymentCountSelector,
      payments: paymentsSelector,
      pieItems: pieItemsSelector,
      pieTotal: pieTotalSelector,
      revenue: revenueSelector,
      spending: spendingSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      onCancelCategory: ACTIONS.cancelCategory,
      onCategoryClick: ACTIONS.selectCategory,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load({ accountId: this.props.accountId })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Ledger)
