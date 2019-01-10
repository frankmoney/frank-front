// @flow strict-local
// flowlint unsafe-getters-setters:off
import * as React from 'react'
import * as R from 'ramda'
import { compose, getContext } from 'recompose'
import PropTypes from 'prop-types'
import AreaSpinner from 'components/AreaSpinner'
import type {
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  PieChartCategories,
} from 'components/OverviewPieChart'
import { formatBarDataPoints, type BarData } from 'data/models/barData'
import { type Payment } from 'data/models/payment'
import {
  forceValidPieTotal,
  type LedgerPieChart,
  type PieTotal,
} from 'data/models/pieData'
import { mapToPlainTextBody, type Story } from 'data/models/stories'
import { ALL_CATEGORIES } from 'const'
import TabbedLayout, {
  OVERVIEW_TAB,
  PAYMENTS_TAB,
  type WidgetTab,
} from './TabbedLayout'
import {
  AboutTab,
  OverviewTab as OverviewTabComponent,
  PaymentListTab,
  StoriesTab,
  type OverviewTabProps,
} from './Tabs'
import { type Period } from './PeriodSelect'
import { buildQuery, remapPieData } from './utils'
import ErrorScreen from './ErrorScreen'

export type WidgetAPI = {|
  accountId: number,
|}

interface Category {
  color?: string;
  id: string;
  name: string;
}

export type WidgetProps = {|
  ...OverviewTabProps,
  //
  barsFooterPadding: number,
  barsHeight: number,
  barsWidth: number,
  CategoryList?: CategoryListComponent,
  OverviewTab: React.Element<typeof OverviewTabComponent>,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  showBarChart: boolean,
  showCategoryCount: boolean,
  widgetSize: number,
  // Styles
  barChartClassName?: string,
  className?: string,
  overviewChartClassName?: string,
  paymentBlockClassName?: string,
  paymentBlockTitleClassName?: string,
  paymentClassName?: string,
  paymentListClassName?: string,
  paymentsPeriodClassName?: string,
  paymentsRootClassName?: string,
  pieChartClassName?: string,
|}

export type WidgetDataProps = {|
  accountDescription: ?string,
  accountName: ?string,
  barData: ?BarData,
  categoryCount: ?number,
  paymentCount: ?number,
  payments: Array<Payment>,
  pieChart: ?LedgerPieChart,
  stories: Array<Story>,
  totals: ?{
    income: number,
    spending: number,
  },
|}

type Props = {|
  ...WidgetAPI,
  ...WidgetProps,
  // context
  graphql: (string, Object) => Promise<Object>, // flowlint-line unclear-type:off
|}

type State = {|
  currentCategory: ?Category,
  pieTotal: PieTotal,
  period: Period,
  tab: WidgetTab,
  //
  ...WidgetDataProps,
  loading: boolean,
  isPrivate: boolean,
|}

class Widget extends React.Component<Props, State> {
  state = {
    currentCategory: null,
    isPrivate: false,
    period: 'All Time',
    pieTotal: 'income',
    tab: OVERVIEW_TAB,
    // data
    accountDescription: null,
    accountName: null,
    barData: null,
    categoryCount: null,
    loading: true,
    paymentCount: null,
    payments: [],
    pieChart: null,
    stories: [],
    totals: null,
  }

  componentDidMount() {
    this.loadData(ALL_CATEGORIES.id)
  }

  get categoryCount(): ?number {
    return this.props.showCategoryCount ? this.state.categoryCount : null
  }

  get currentCategoryId(): ?string {
    return R.prop('id', this.state.currentCategory) || null
  }

  get payments() {
    return this.state.payments
  }

  get paymentCount(): ?number {
    return this.state.paymentCount
  }

  get pieTotal(): ?PieTotal {
    return this.state.pieChart
      ? forceValidPieTotal(this.state.pieTotal, this.state.pieChart)
      : null
  }

  get pieTotalSelectable(): boolean {
    return this.state.pieTotal === this.pieTotal
  }

  get pieItems(): ?PieChartCategories {
    return this.state.pieChart && this.pieTotal
      ? remapPieData(this.pieTotal, this.state.pieChart)
      : null
  }

  get barData(): ?BarData {
    return this.state.barData
  }

  get period(): Period {
    return this.state.period
  }

  get stories(): Array<Story> {
    return R.map(mapToPlainTextBody, this.state.stories)
  }

  // // eslint-disable-next-line class-methods-use-this
  // get periods(): Array<Period> {
  //   return ['All time', '2018', 'TBD'] // TODO: dynamic list?
  // }

  loadData = (categoryId: ?string) => {
    const { graphql, accountId } = this.props
    this.setState(
      {
        loading: true,
      },
      () => {
        const loadCategories = R.isNil(this.state.categoryCount)
        graphql(...buildQuery(accountId, categoryId, loadCategories)).then(
          ({
            account: { name },
            barChart,
            barsUnit,
            categories,
            description,
            payments,
            pieChart,
            revenue,
            spending,
            stories,
            totalCount,
          }) =>
            this.setState({
              loading: false,
              //
              accountDescription: description,
              accountName: name,
              barData: barChart
                ? formatBarDataPoints(barChart, barsUnit)
                : null,
              categoryCount: loadCategories
                ? R.length(categories)
                : this.state.categoryCount,
              paymentCount: totalCount,
              payments,
              pieChart,
              stories,
              totals: {
                income: revenue,
                spending,
              },
            }),
          ({ response: { status, errors } }) => {
            const error = R.pipe(
              R.head,
              R.prop('message')
            )(errors)
            if (status === 200) {
              if (error === 'Not Found') {
                this.setState({
                  loading: false,
                  isPrivate: true,
                })
              } else {
                console.log('GraphQL result', error) // eslint-disable-line no-console
              }
            } else {
              console.error('GraphQL error', error) // eslint-disable-line no-console
            }
          }
        )
      }
    )
  }

  handleTabSwitch = (tab: WidgetTab) => this.setState({ tab })

  handleCategorySelect = (category: Category) => {
    this.setState(
      {
        currentCategory: category,
        tab: PAYMENTS_TAB,
      },
      () => this.loadData(category.id)
    )
  }

  handleCategoryCancel = () =>
    this.setState(
      {
        currentCategory: null,
        tab: OVERVIEW_TAB,
      },
      () => this.loadData(ALL_CATEGORIES.id)
    )

  handlePieTotalChange = (pieTotal: PieTotal) => this.setState({ pieTotal })

  handlePeriodChange = (period: Period) => this.setState({ period })

  render() {
    const { currentCategory, isPrivate, loading, tab } = this.state
    if (loading) {
      return <AreaSpinner />
    }
    if (isPrivate) {
      return <ErrorScreen cause="private" />
    }
    if (this.paymentCount === 0) {
      return <ErrorScreen cause="empty" />
    }

    const {
      barChartClassName,
      barsFooterPadding,
      barsHeight,
      barsWidth,
      className,
      OverviewTab,
      paymentBlockClassName,
      paymentBlockTitleClassName,
      paymentClassName,
      paymentListClassName,
      paymentsPeriodClassName,
      paymentsRootClassName,
      PaymentsSummary,
      showBarChart,
      Totals,
    } = this.props

    const currentCategoryColor = R.prop('color', currentCategory)
    const currentCategoryName = R.prop('name', currentCategory)
    const showCategories = this.currentCategoryId === ALL_CATEGORIES.id
    const hideStoriesTab = R.isEmpty(this.stories)

    const periodSelect = null
    // (
    //   <PeriodSelect
    //     onPeriodChange={this.handlePeriodChange}
    //     period={this.period}
    //     periods={this.periods}
    //   />
    // )

    const paymentsSummary = PaymentsSummary
      ? React.cloneElement(PaymentsSummary, {
          categoryCount: this.categoryCount,
          onLinkClick: () => this.handleCategorySelect(ALL_CATEGORIES),
          paymentCount: this.paymentCount,
        })
      : null

    const totals = Totals ? React.cloneElement(Totals, this.state.totals) : null

    const overviewTab = !this.pieItems
      ? null
      : React.cloneElement(OverviewTab, {
          onCategoryClick: this.handleCategorySelect,
          onPieTotalChange: this.handlePieTotalChange,
          PaymentsSummary: paymentsSummary,
          PeriodSelect: periodSelect,
          pieItems: this.pieItems,
          pieTotal: this.pieTotal,
          pieTotalSelectable: this.pieTotalSelectable,
          Totals: totals,
        })

    const aboutTab = (
      <AboutTab
        description={this.state.accountDescription}
        name={this.state.accountName}
        Totals={totals}
      />
    )

    return (
      <TabbedLayout
        className={className}
        hideStoriesTab={hideStoriesTab}
        onTabSwitch={this.handleTabSwitch}
        tab={tab}
        OverviewTab={overviewTab}
        PaymentListTab={
          this.barData && (
            <PaymentListTab
              barChartClassName={barChartClassName}
              barsData={this.barData}
              barsHeight={barsHeight}
              barsWidth={barsWidth}
              className={paymentsRootClassName}
              currentCategoryColor={currentCategoryColor}
              currentCategoryName={currentCategoryName}
              footerPadding={barsFooterPadding}
              onCancelCategoryClick={this.handleCategoryCancel}
              paymentBlockClassName={paymentBlockClassName}
              paymentBlockTitleClassName={paymentBlockTitleClassName}
              paymentClassName={paymentClassName}
              paymentListClassName={paymentListClassName}
              paymentsData={this.payments}
              paymentsPeriodClassName={paymentsPeriodClassName}
              PeriodSelect={periodSelect}
              showBarChart={showBarChart}
              showCategories={showCategories}
            />
          )
        }
        StoriesTab={
          <StoriesTab accountId={this.props.accountId} stories={this.stories} />
        }
        AboutTab={aboutTab}
      />
    )
  }
}

export default compose(
  getContext({
    graphql: PropTypes.func.isRequired,
  })
)(Widget)
