// @flow strict-local
// flowlint unsafe-getters-setters:off
import React from 'react'
import * as R from 'ramda'
import { type PieChartCategories } from 'components/OverviewPieChart'
import {
  forceValidPieTotal,
  remapPieData,
  type PieTotal,
} from 'data/models/pieData'
import reconnect from 'utils/reconnect'
import TabbedLayout, { PAYMENTS_TAB, type WidgetTab } from './TabbedLayout'
import { AboutTab, OverviewTab, PaymentListTab, StoriesTab } from './Tabs'
import type { Period } from './PeriodSelect'
import { rawPaymentsSelector, rawPieDataSelector } from './selectors'
import type { Props } from './Widget.flow'

type Category = {
  color?: string,
  id: ?number,
  name: string,
}

const ALL_CATEGORIES: Category = {
  name: 'Payments',
  id: null,
}

type State = {|
  currentCategory: ?Category,
  pieTotal: PieTotal,
  period: Period,
  tab: ?WidgetTab,
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
    tab: null,
  }

  get currentCategoryId(): ?number {
    return R.prop('id', this.state.currentCategory)
  }

  get payments() {
    // TODO: use period in the filter
    return filterPayments(this.currentCategoryId, this.props.rawPayments)
  }

  get paymentCount(): number {
    return R.length(this.props.rawPayments)
  }

  get pieTotal(): PieTotal {
    return forceValidPieTotal(this.state.pieTotal, this.props.rawPieData)
  }

  get pieTotalSelectable(): boolean {
    return this.state.pieTotal === this.pieTotal
  }

  get pieItems(): PieChartCategories {
    return remapPieData(this.pieTotal, this.props.rawPieData)
  }

  get period(): Period {
    return this.state.period
  }

  // eslint-disable-next-line class-methods-use-this
  get periods(): Array<Period> {
    return ['All time', '2018', 'TBD'] // TODO: dynamic list?
  }

  handleCategorySelect = (category: Category) =>
    this.setState({ currentCategory: category, tab: PAYMENTS_TAB })

  handleCategoryCancel = () =>
    this.setState({
      currentCategory: null,
      tab: null,
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

    const barsData = [] // FIXME: data shape

    return (
      <TabbedLayout
        className={className}
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
            barsData={barsData}
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

export default reconnect(
  {
    rawPayments: rawPaymentsSelector,
    rawPieData: rawPieDataSelector,
  },
  {}
)(Widget)
