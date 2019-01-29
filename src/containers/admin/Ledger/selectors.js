// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import { format } from 'date-fns/fp'
import {
  formatBarDataPoints,
  type BarData,
  type BarsDataPoint,
} from 'data/models/barData'
import {
  DEFAULT_PIE_TOTAL,
  PIE_TOTAL_PARAMETER_NAME,
  forceValidPieTotal,
  createPieDataMapper,
  type LedgerPieChart,
  type PieChartItems,
  type PieTotal,
} from 'data/models/pieData'
import type { Selector, ReduxState } from 'flow/redux'
import {
  formatDateRangeFilter,
  formatMonth,
  parseDate,
  parseMonth,
} from 'utils/dates'
import {
  parseQueryStringNumber,
  parseQueryStringBool,
  parseQueryString,
} from 'utils/querystring'
import { UNCATEGORIZED_CATEGORY } from 'const'
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'

const LOCAL_UNCATEGORIZED_CATEGORY = {
  ...UNCATEGORIZED_CATEGORY,
  name: 'Unpublished',
}

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const isLoadFailedSelector = get('isLoadFailed')
export const isLoadingSelector = get('loading')
export const isNotFoundSelector = get('isNotFound')
export const loadedSelector = get('loaded')
export const listIsUpdatingSelector = get('updatingList')
export const isTypingSelector = get('typing')
export const lastCascadeCountSelector = get('lastCascadeCount')
export const cascadeSnackbarShown = createSelector(
  lastCascadeCountSelector,
  x => x > 0
)

export const paymentsTotalCountSelector = get('paymentsCount')
export const categoriesSelector = createPlainObjectSelector(get('categories'))
export const paymentCardCategoriesSelector = categoriesSelector

export const paymentsSelector = createPlainObjectSelector(get('payments'))

export const listDisabledSelector = createSelector(
  listIsUpdatingSelector,
  isTypingSelector,
  (updating, typing) => updating || typing
)

export const hasNoResultsSelector = createSelector(paymentsSelector, R.isEmpty)

export const dataSourceSelector = createSelector(
  paymentsSelector,
  R.pipe(
    R.groupBy(({ postedOn: date }) => formatMonth(date)),
    R.toPairs,
    R.map(
      R.converge((title, rows) => ({ title, rows }), [
        R.pipe(
          R.head,
          parseMonth,
          format('MMM YYYY')
        ),
        R.pipe(
          R.last,
          R.map(R.prop('id'))
        ),
      ])
    )
  )
)

export const rowDataSelector = (id: number) =>
  createSelector(
    paymentsSelector,
    R.find(x => x.id.toString() === id.toString())
  )

export const totalPagesSelector = createSelector(
  paymentsTotalCountSelector,
  count => Math.ceil(count / PAGE_SIZE)
)

// Filters

export const currentCategoryIdSelector = createSelector(
  queryParamSelector('category'),
  x => x || null
)

const verifiedSelector: Selector<boolean> = createSelector(
  queryParamSelector('verified'),
  parseQueryStringBool
)

const currentCategorySelector = createSelector(
  categoriesSelector,
  currentCategoryIdSelector,
  verifiedSelector,
  (categories, id, verified) =>
    verified === false
      ? LOCAL_UNCATEGORIZED_CATEGORY
      : R.find(R.propEq('id', id), categories)
)

export const currentCategoryNameSelector = createSelector(
  currentCategorySelector,
  R.prop('name')
)

export const currentPageSelector = createSelector(
  queryParamSelector('page'),
  page => parseQueryStringNumber(page) || 1
)

export const searchTextSelector = createSelector(
  queryParamSelector('search'),
  string => parseQueryString(string)
)

export const currentFiltersSelector = createSelector(
  queryParamSelector('amountMin'),
  queryParamSelector('amountMax'),
  queryParamSelector('dateMin'),
  queryParamSelector('dateMax'),
  queryParamSelector('verified'),
  (amountMin, amountMax, dateMin, dateMax, verified) => ({
    amountMin: parseQueryStringNumber(amountMin),
    amountMax: parseQueryStringNumber(amountMax),
    dateMin: dateMin ? parseDate(dateMin) : null,
    dateMax: dateMax ? parseDate(dateMax) : null,
    verified: parseQueryStringBool(verified),
  })
)

export const currentFiltersCountSelector = createSelector(
  queryParamSelector('amountMin'),
  queryParamSelector('amountMax'),
  queryParamSelector('dateMin'),
  queryParamSelector('dateMax'),
  queryParamSelector('verified'),
  R.unapply(
    R.pipe(
      R.filter(x => typeof x !== 'undefined' && x !== ''),
      R.length
    )
  )
)

export const periodSelector = createSelector(
  queryParamSelector('dateMin'),
  queryParamSelector('dateMax'),
  formatDateRangeFilter
)

// Chart Selectors

const rawPieTotalSelector: Selector<PieTotal> = createSelector(
  queryParamSelector(PIE_TOTAL_PARAMETER_NAME),
  string =>
    string
      ? (parseQueryString(string): any) // flowlint-line unclear-type:off
      : DEFAULT_PIE_TOTAL
)

export const noTextSearchSelector = createSelector(
  searchTextSelector,
  R.either(R.isNil, R.isEmpty)
)

export const unfilteredCountSelector = get('unfilteredCount')

export const isEmptyAccountSelector = createSelector(
  unfilteredCountSelector,
  R.equals(0)
)

export const barChartOnlySelector = createSelector(
  currentCategorySelector,
  R.complement(R.isNil)
)

const barsUnitSelector = get('barsUnit')

export const barChartClickableSelector = createSelector(
  barsUnitSelector,
  R.compose(
    R.not,
    R.equals('day')
  )
)

export const barChartColorSelector = createSelector(
  currentCategorySelector,
  R.prop('color')
)

const rawBarDataSelector: Selector<
  Array<BarsDataPoint>
> = createPlainObjectSelector(get('barsData'))

export const barChartDataSelector: Selector<BarData> = createSelector(
  rawBarDataSelector,
  barsUnitSelector,
  formatBarDataPoints
)

const rawPieDataSelector: Selector<LedgerPieChart> = createPlainObjectSelector(
  get('pieData')
)

export const chartsVisibleSelector = createSelector(
  noTextSearchSelector,
  rawPieDataSelector,
  barChartOnlySelector,
  rawBarDataSelector,
  (
    noSearch: boolean,
    pieData: LedgerPieChart,
    showBarsOnly: boolean,
    barData: Array<BarsDataPoint>
  ) =>
    noSearch &&
    ((pieData && pieData.items.length > 0) ||
      (showBarsOnly && barData.length > 0))
)

export const pieTotalSelector: Selector<PieTotal> = createSelector(
  rawPieTotalSelector,
  rawPieDataSelector,
  forceValidPieTotal
)

export const totalSelectableSelector: Selector<boolean> = createSelector(
  rawPieTotalSelector,
  pieTotalSelector,
  R.equals
)

export const pieItemsSelector: Selector<PieChartItems> = createSelector(
  pieTotalSelector,
  rawPieDataSelector,
  createPieDataMapper({
    nameEmptyCategoryAs: LOCAL_UNCATEGORIZED_CATEGORY.name,
  })
)

// Similar payments

export const SIMILAR = {
  drawerOpenedSelector: get('similarDrawerOpen'),
  listLoadingSelector: get('similarListLoading'),
  listMoreLoadingSelector: get('similarListMoreLoading'),
  similarPaymentsSelector: createPlainObjectSelector(get('similarPayments')),
  loadedPagesCounterSelector: get('similarLoadedPagesCount'),
  totalPagesCounterSelector: get('similarTotalPagesCount'),
}
