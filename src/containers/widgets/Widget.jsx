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
import type { FooterClasses, FooterProps } from './Footer'
import TabbedLayout, {
  OVERVIEW_TAB,
  PAYMENTS_TAB,
  type WidgetTab,
} from './TabbedLayout'
import { AboutTab, OverviewTab, PaymentListTab, StoriesTab } from './Tabs'
import type { Period } from './PeriodSelect'
import { ALL_CATEGORIES, buildQuery, remapPieData } from './utils'

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
  barData: ?BarData,
  payments: Array<Payment>,
  pieChart: ?LedgerPieChart,
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
|}

class Widget extends React.Component<Props, State> {
  state = {
    currentCategory: null,
    pieTotal: 'income',
    period: 'All Time',
    tab: OVERVIEW_TAB,
    //
    loading: true,
    barData: null,
    payments: [],
    pieChart: null,
  }

  componentDidMount() {
    this.loadData(ALL_CATEGORIES.id)
  }

  get currentCategoryId(): ?string {
    return R.prop('id', this.state.currentCategory) || null
  }

  get payments() {
    return this.state.payments
  }

  get paymentCount(): number {
    return R.length(this.state.payments)
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
        graphql(...buildQuery(accountId, categoryId)).then(response => {
          const { pieChart, payments, barChart, barsUnit } = response
          console.log('graphql', response)
          this.setState({
            loading: false,
            pieChart,
            payments,
            barData: barChart ? formatBarDataPoints(barChart, barsUnit) : null,
          })
        })
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
    if (this.state.loading) {
      return <AreaSpinner />
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
      showCategoryCount,
      showOverviewTotals,
      widgetSize,
    } = this.props
    const { currentCategory, tab } = this.state

    const currentCategoryColor = R.prop('color', currentCategory)
    const currentCategoryName = R.prop('name', currentCategory)

    const showCategories = R.isNil(this.currentCategoryId)

    const categoryCount = showCategoryCount ? R.length(this.pieItems) : null

    return (
      <TabbedLayout
        className={className}
        onTabSwitch={this.handleTabSwitch}
        tab={tab}
        OverviewTab={
          this.pieItems && (
            <OverviewTab
              categoryCount={categoryCount}
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
              showTotals={showOverviewTotals}
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
        StoriesTab={<StoriesTab />}
        AboutTab={<AboutTab />}
      />
    )
  }
}

export default compose(
  getContext({
    graphql: PropTypes.func.isRequired,
  })
)(Widget)
