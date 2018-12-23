// @flow strict-local
// flowlint unsafe-getters-setters:off
import React from 'react'
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
import type { Story } from 'data/models/stories'
import type { FooterClasses, FooterProps } from './Footer'
import TabbedLayout, {
  OVERVIEW_TAB,
  PAYMENTS_TAB,
  type WidgetTab,
} from './TabbedLayout'
import { OverviewTab, PaymentListTab, StoriesTab } from './Tabs'
import type { Period } from './PeriodSelect'
import { ALL_CATEGORIES, buildQuery, remapPieData } from './utils'
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
  barsFooterPadding: number,
  barsHeight: number,
  barsWidth: number,
  CategoryList?: CategoryListComponent,
  pieChartRootComponent?: CategoryListPieChartRootComponent,
  showBarChart: boolean,
  showCategoryCount: boolean,
  showOverviewTotals?: boolean,
  widgetSize: number,
  // Styles
  barChartClassName?: string,
  className?: string,
  contentClassName?: string,
  overviewChartClassName?: string,
  paymentBlockClassName?: string,
  paymentBlockTitleClassName?: string,
  paymentClassName?: string,
  paymentListClassName?: string,
  paymentsPeriodClassName?: string,
  pieChartClassName?: string,
  //
  OverviewFooterClasses?: FooterClasses,
  OverviewFooterProps?: FooterProps,
|}

export type WidgetDataProps = {|
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

  // eslint-disable-next-line class-methods-use-this
  get periods(): Array<Period> {
    return ['All time', '2018', 'TBD'] // TODO: dynamic list?
  }

  loadData = (categoryId: ?string) => {
    const { graphql, accountId } = this.props
    this.setState(
      {
        loading: true,
      },
      () =>
        // TODO: use period in the request
        graphql(
          ...buildQuery(
            accountId,
            categoryId,
            R.isNil(this.state.categoryCount)
          )
        ).then(
          ({
            barChart,
            barsUnit,
            categories,
            name,
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
              accountName: name,
              barData: barChart
                ? formatBarDataPoints(barChart, barsUnit)
                : null,
              categoryCount: R.length(categories),
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

  handlePeriodChange = (period: PieTotal) => this.setState({ period })

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
      CategoryList,
      className,
      contentClassName,
      overviewChartClassName,
      OverviewFooterClasses,
      OverviewFooterProps,
      paymentBlockClassName,
      paymentBlockTitleClassName,
      paymentClassName,
      paymentListClassName,
      paymentsPeriodClassName,
      pieChartClassName,
      pieChartRootComponent,
      showBarChart,
      showOverviewTotals,
      widgetSize,
    } = this.props

    const currentCategoryColor = R.prop('color', currentCategory)
    const currentCategoryName = R.prop('name', currentCategory)
    const showCategories = this.currentCategoryId === ALL_CATEGORIES.id
    const hideStoriesTab = R.isEmpty(this.state.stories)

    return (
      <TabbedLayout
        className={className}
        hideAboutTab
        hideStoriesTab={hideStoriesTab}
        onTabSwitch={this.handleTabSwitch}
        tab={tab}
        OverviewTab={
          this.pieItems && (
            <OverviewTab
              categoryCount={this.categoryCount}
              CategoryList={CategoryList}
              chartClassName={overviewChartClassName}
              contentClassName={contentClassName}
              FooterClasses={OverviewFooterClasses}
              FooterProps={OverviewFooterProps}
              onCategoryClick={this.handleCategorySelect}
              onPeriodChange={this.handlePeriodChange}
              onPieTotalChange={this.handlePieTotalChange}
              onSeeAllClick={() => this.handleCategorySelect(ALL_CATEGORIES)}
              paymentCount={this.paymentCount}
              period={this.period}
              periods={this.periods}
              pieChartRootComponent={pieChartRootComponent}
              pieClassName={pieChartClassName}
              pieItems={this.pieItems}
              pieTotal={this.pieTotal}
              pieTotalSelectable={this.pieTotalSelectable}
              totals={showOverviewTotals ? this.state.totals : null}
              widgetSize={widgetSize}
            />
          )
        }
        PaymentListTab={
          this.barData && (
            <PaymentListTab
              barChartClassName={barChartClassName}
              barsData={this.barData}
              barsHeight={barsHeight}
              barsWidth={barsWidth}
              contentClassName={contentClassName}
              currentCategoryColor={currentCategoryColor}
              currentCategoryName={currentCategoryName}
              footerPadding={barsFooterPadding}
              onCancelCategoryClick={this.handleCategoryCancel}
              onPeriodChange={this.handlePeriodChange}
              paymentBlockClassName={paymentBlockClassName}
              paymentBlockTitleClassName={paymentBlockTitleClassName}
              paymentClassName={paymentClassName}
              paymentListClassName={paymentListClassName}
              paymentsData={this.payments}
              paymentsPeriodClassName={paymentsPeriodClassName}
              period={this.period}
              periods={this.periods}
              showBarChart={showBarChart}
              showCategories={showCategories}
            />
          )
        }
        StoriesTab={
          <StoriesTab
            accountId={this.props.accountId}
            stories={this.state.stories}
          />
        }
        AboutTab={null}
        // <AboutTab name={this.state.accountName} totals={this.state.totals} />
      />
    )
  }
}

export default compose(
  getContext({
    graphql: PropTypes.func.isRequired,
  })
)(Widget)
