// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import { format } from 'date-fns/fp'
import {
  convertToBarChartValues,
  formatBarLabels,
  type BarsDataPoint,
  type BarsUnit,
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
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const listIsUpdatingSelector = get('updatingList')
export const isTypingSelector = get('typing')
export const paymentsTotalCountSelector = get('paymentsCount')
export const categoriesSelector = createPlainObjectSelector(get('categories'))
export const paymentCardCategoriesSelector = categoriesSelector

export const paymentsSelector = createPlainObjectSelector(get('payments'))

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
  isTypingSelector,
  (updating, typing) => updating || typing
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

const currentCategorySelector = createSelector(
  categoriesSelector,
  currentCategoryIdSelector,
  (categories, id) => R.find(R.propEq('id', id), categories)
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

export const isEmptyAccountSelector = createSelector(
  hasNoResultsSelector,
  currentFiltersCountSelector,
  (noResults, filterCount) => noResults && filterCount === 0
)

export const periodSelector = createSelector(
  queryParamSelector('dateMin'),
  queryParamSelector('dateMax'),
  formatDateRangeFilter
)

// Chart Selectors

const rawPieTotalSelector: Selector<PieTotal> = createSelector(
  queryParamSelector(PIE_TOTAL_PARAMETER_NAME),
  string => ((string ? parseQueryString(string) : DEFAULT_PIE_TOTAL): PieTotal)
)

export const noTextSearchSelector = createSelector(
  searchTextSelector,
  R.either(R.isNil, R.isEmpty)
)

export const barChartOnlySelector = createSelector(
  currentCategoryIdSelector,
  R.complement(R.either(R.isNil, R.isEmpty))
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

export const barChartDataSelector = createSelector(
  createPlainObjectSelector(get('barsData')),
  barsUnitSelector,
  (data: BarsDataPoint, barsUnit: BarsUnit) =>
    R.pipe(
      R.map(convertToBarChartValues),
      list =>
        list.reduce((acc, item, idx) => {
          const prev = idx > 0 ? list[idx - 1] : null
          return R.append(
            {
              ...item.values,
              date: JSON.stringify(formatBarLabels(item, prev, barsUnit)),
            },
            acc
          )
        }, [])
    )(data)
)

const rawPieDataSelector: Selector<LedgerPieChart> = createPlainObjectSelector(
  get('pieData')
)

export const chartsVisibleSelector = createSelector(
  noTextSearchSelector,
  rawPieDataSelector,
  currentFiltersSelector,
  (noSearch, { items }: LedgerPieChart, filters) =>
    noSearch &&
    R.length(items) > 0 &&
    // means show only Unpublished or without category
    filters.verified !== false
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
  createPieDataMapper({ nameEmptyCategoryAs: 'Unpublished' })
)

export const isPaymentSavingSelector = R.memoizeWith(R.identity, id =>
  createSelector(get('paymentIdsSaving'), ids => ids.has(id))
)
export const isPaymentPublishingSelector = R.memoizeWith(R.identity, id =>
  createSelector(get('paymentIdsPublishing'), ids => ids.has(id))
)
