// @flow strict
import * as R from 'ramda'
import * as D from 'date-fns/fp'
import { matchPath } from 'react-router'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector, pathnameSelector } from '@frankmoney/webapp'
import { formatBarDataPoints, type BarData } from 'data/models/barData'
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
import { ALL_CATEGORIES, ROUTES, UNCATEGORIZED_CATEGORY } from 'const'
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const accountIdSelector = get('id')

// Stats

export const nameSelector = get('name')
export const descriptionSelector = get('description')
export const spendingSelector = get('spending')
export const revenueSelector = get('revenue')
export const totalSelector = get('total')

// Tabs

export const currentTabSelector = createSelector(pathnameSelector, path => {
  const storiesMatch = matchPath(path, ROUTES.account.stories.root)
  return storiesMatch ? 'stories' : 'ledger'
})

// Stories

export const storiesSelector = createPlainObjectSelector(get('stories'))
export const storiesCountSelector = createSelector(
  storiesSelector,
  stories => stories.length
)

// Overview and list table

export const listIsUpdatingSelector = get('updatingList')
export const paymentsTotalCountSelector = get('paymentsCount')
export const categoriesSelector = createPlainObjectSelector(get('categories'))
export const paymentsSelector = createPlainObjectSelector(get('payments'))

export const categoryCountSelector = createSelector(
  categoriesSelector,
  R.length
)

export const paymentCountSelector = get('paymentsCount')

const propContainsText = (prop, text) => x =>
  (x[prop] || '').toLowerCase().includes(text.toLowerCase())

const filterPaymentByText = text =>
  text
    ? R.anyPass([
        propContainsText('description', text),
        propContainsText('categoryName', text),
      ])
    : R.always(true)

export const listDisabledSelector = createSelector(
  listIsUpdatingSelector,
  updating => updating
)

export const paymentsIdsSelector = createSelector(
  paymentsSelector,
  get('searchText'),
  (list, searchText) =>
    R.pipe(
      R.filter(filterPaymentByText(searchText)),
      R.map(R.prop('id'))
    )(list)
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
          D.format('MMMM YYYY')
        ),
        R.pipe(
          R.last,
          R.map(R.prop('id'))
        ),
      ])
    )
  )
)

export const rowDataSelector = (id: string) =>
  createSelector(
    paymentsSelector,
    R.find(x => x.id.toString() === id.toString())
  )

export const totalPagesSelector = createSelector(
  paymentsTotalCountSelector,
  count => Math.ceil(count / PAGE_SIZE)
)

// Filters

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

export const currentCategoryIdSelector = createSelector(
  queryParamSelector('category'),
  x => x || null
)

const verifiedSelector: Selector<?boolean> = createSelector(
  queryParamSelector('verified'),
  parseQueryStringBool
)

export const currentCategorySelector = createSelector(
  categoriesSelector,
  currentCategoryIdSelector,
  verifiedSelector,
  (categories, id, verified) =>
    verified === false
      ? UNCATEGORIZED_CATEGORY
      : id === ALL_CATEGORIES.id
        ? ALL_CATEGORIES
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

export const barChartOnlySelector = createSelector(
  currentCategorySelector,
  R.complement(R.isNil)
)

export const barChartColorSelector = createSelector(
  currentCategorySelector,
  R.prop('color')
)

const barsUnitSelector = get('barsUnit')

export const barChartClickableSelector = createSelector(
  barsUnitSelector,
  R.compose(
    R.not,
    R.equals('day')
  )
)

export const barChartDataSelector: Selector<BarData> = createSelector(
  createPlainObjectSelector(get('barsData')),
  barsUnitSelector,
  formatBarDataPoints
)

const rawPieDataSelector: Selector<LedgerPieChart> = createPlainObjectSelector(
  get('pieData')
)

export const chartsVisibleSelector = createSelector(
  noTextSearchSelector,
  rawPieDataSelector,
  (noSearch, { items }: LedgerPieChart) => noSearch && R.length(items) > 0
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
  createPieDataMapper({ nameEmptyCategoryAs: 'Uncategorized' })
)

export const allPeersSelector = createPlainObjectSelector(get('allPeers'))
