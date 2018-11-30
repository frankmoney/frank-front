import * as R from 'ramda'
import { matchPath } from 'react-router'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector, pathnameSelector } from '@frankmoney/webapp'
import { format } from 'date-fns/fp'
import {
  convertToBarChartValues,
  formatBarLabels,
  type BarsDataPoint,
  type BarsUnit,
} from 'data/models/barData'
import type { CategoryType } from 'data/models/category'
import { remapPieData, sumProp } from 'data/models/pieData'
import {
  parseDate,
  formatMonth,
  parseMonth,
  formatDateRange,
} from 'utils/dates'
import {
  parseQueryStringNumber,
  parseQueryStringBool,
  parseQueryString,
} from 'utils/querystring'
import { ROUTES } from 'const'
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const accountIdSelector = get('id')

// Stats

export const nameSelector = get('name')
export const spendingSelector = get('spending')
export const revenueSelector = get('revenue')
export const totalSelector = get('total')

// Tabs

export const currentTabSelector = createSelector(pathnameSelector, path => {
  const match = matchPath(path, ROUTES.public.ledger.idRootTab)
  return (match && match.params.tab) || 'ledger'
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
          format('MMMM YYYY')
        ),
        R.pipe(
          R.last,
          R.map(R.prop('id'))
        ),
      ])
    )
  )
)

export const rowDataSelector = id =>
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

export const currentCategorySelector = createSelector(
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

export const categoryTypeSelector = createSelector(
  queryParamSelector('categoryType'),
  string => ((string ? parseQueryString(string) : 'spending'): CategoryType)
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
  (dateMin, dateMax) =>
    dateMin && dateMax
      ? formatDateRange(dateMin, dateMax, { short: false })
      : 'All time'
)

// Chart Selectors

export const chartsVisibleSelector = createSelector(
  searchTextSelector,
  R.either(R.isNil, R.isEmpty)
)

export const barChartOnlySelector = createSelector(
  currentCategoryIdSelector,
  R.complement(R.either(R.isNil, R.isEmpty))
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

const rawPieDataSelector = createPlainObjectSelector(get('pieData'))

const totalExpensesSelector = createSelector(
  rawPieDataSelector,
  sumProp('expenses')
)
const totalIncomeSelector = createSelector(
  rawPieDataSelector,
  sumProp('income')
)

export const pieChartDataSelector = createSelector(
  rawPieDataSelector,
  totalExpensesSelector,
  totalIncomeSelector,
  remapPieData
)

export const allPeersSelector = createPlainObjectSelector(get('allPeers'))
