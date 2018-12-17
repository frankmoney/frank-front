// @flow strict-local
// flowlint unsafe-getters-setters:off
import React from 'react'
import * as R from 'ramda'
import type { BarData } from 'components/Charts/Bar'
import type {
  CategoryListComponent,
  CategoryListPieChartRootComponent,
  PieChartCategories,
} from 'components/OverviewPieChart'
import {
  createPieDataMapper,
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

type Category = {
  color?: string,
  id: ?number,
  name: string,
}

const ALL_CATEGORIES: Category = {
  name: 'Payments',
  id: null,
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
  barChart: BarData,
  payments: Array<Object>, // flowlint-line unclear-type:warn
  pieChart: LedgerPieChart,
|}

type Props = {|
  ...WidgetDataProps,
  ...WidgetProps,
|}

type State = {|
  currentCategory: ?Category,
  pieTotal: PieTotal,
  period: Period,
  tab: WidgetTab,
|}

const filterPayments = (categoryId, items) =>
  categoryId === null
    ? items
    : R.filter(R.pathEq(['category', 'id'], categoryId))(items)

class Widget extends React.PureComponent<Props, State> {
  state = {
    currentCategory: null,
    pieTotal: 'income',
    period: 'All Time',
    tab: OVERVIEW_TAB,
  }

  get currentCategoryId(): ?number {
    return R.prop('id', this.state.currentCategory)
  }

  get payments() {
    // TODO: use period in the filter
    return filterPayments(this.currentCategoryId, this.props.payments)
  }

  get paymentCount(): number {
    return R.length(this.props.payments)
  }

  get pieTotal(): PieTotal {
    return forceValidPieTotal(this.state.pieTotal, this.props.pieChart)
  }

  get pieTotalSelectable(): boolean {
    return this.state.pieTotal === this.pieTotal
  }

  get pieItems(): PieChartCategories {
    const remapPieData = createPieDataMapper({
      nameEmptyCategoryAs: 'Uncategorized',
    })
    return remapPieData(this.pieTotal, this.props.pieChart)
  }

  get barsData(): BarData {
    return [] // this.props.barChart // FIXME: convert to the right format
  }

  get period(): Period {
    return this.state.period
  }

  // eslint-disable-next-line class-methods-use-this
  get periods(): Array<Period> {
    return ['All time', '2018', 'TBD'] // TODO: dynamic list?
  }

  handleTabSwitch = (tab: WidgetTab) => this.setState({ tab })

  handleCategorySelect = (category: Category) =>
    this.setState({ currentCategory: category, tab: PAYMENTS_TAB })

  handleCategoryCancel = () =>
    this.setState({
      currentCategory: null,
      tab: OVERVIEW_TAB,
    })

  handlePieTotalChange = (pieTotal: PieTotal) => this.setState({ pieTotal })

  handlePeriodChange = (period: PieTotal) => this.setState({ period })

  render() {
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
        }
        PaymentListTab={
          <PaymentListTab
            barChartClassName={barChartClassName}
            barsData={this.barsData}
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
        }
        StoriesTab={<StoriesTab />}
        AboutTab={<AboutTab />}
      />
    )
  }
}

export default Widget
