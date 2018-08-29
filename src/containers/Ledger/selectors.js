import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import { isSameYear, format } from 'date-fns/fp'
import { parseDate, formatMonth, parseMonth } from 'utils/dates'
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'
import { parseQueryStringBool, parseQueryStringNumber } from './utils'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])
const getFilters = (...prop) => get('filtersEdit', ...prop)

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
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

export const rowDataSelector = id =>
  createSelector(
    paymentsSelector,
    R.find(x => x.id.toString() === id.toString())
  )

export const totalPagesSelector = createSelector(
  paymentsTotalCountSelector,
  count => Math.ceil(count / PAGE_SIZE)
)

// Filters drawer

export const isFiltersEstimatingResultsCountSelector = getFilters(
  'estimatingResults'
)
export const isFiltersLoadedSelector = getFilters('loaded')
export const isFiltersOpenSelector = getFilters('open')
export const isFiltersEstimatingSelector = getFilters('estimatingResults')
export const filtersDataSelector = createPlainObjectSelector(getFilters('data'))
export const filtersEstimatedResultsCountSelector = getFilters('totalCount')

// Filters

export const currentCategoryIdSelector = createSelector(
  queryParamSelector('category'),
  x => x || null
)

export const currentCategoryNameSelector = createSelector(
  categoriesSelector,
  currentCategoryIdSelector,
  (list, id) =>
    R.pipe(
      R.find(R.propEq('id', id)),
      R.prop('name')
    )(list)
)

export const currentPageSelector = createSelector(
  queryParamSelector('page'),
  page => parseQueryStringNumber(page) || 1
)

export const searchTextSelector = queryParamSelector('search')

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

// Chart Selectors

export const chartsVisibleSelector = createSelector(
  searchTextSelector,
  R.either(R.isNil, R.isEmpty)
)

export const barChartOnlySelector = createSelector(
  currentCategoryIdSelector,
  R.complement(R.either(R.isNil, R.isEmpty))
)

// [{date:String,negativeValue:Float,value:Float}]
export const barChartDataSelector = createSelector(
  createPlainObjectSelector(get('barsData')),
  R.pipe(
    R.map(({ date, income: value, expenses: negateValue }) => ({
      date,
      value: Math.floor(value),
      negativeValue: Math.floor(negateValue),
    })),
    list =>
      list.reduce((acc, item, idx) => {
        const prev = idx > 0 ? list[idx - 1] : null
        const isNewYear =
          prev && !isSameYear(parseDate(item.date), parseDate(prev.date))
        return acc.concat([
          {
            ...item,
            date: format(isNewYear ? 'MMM YYYY' : 'MMM', parseDate(item.date)),
          },
        ])
      }, [])
  )
)

// из [category{name,color},income,expenses] в {income|spending: [{color,name,value}]} где value процент от всех income|spending
const rawPieDataSelector = createPlainObjectSelector(get('pieData'))

const totalExpensesSelector = createSelector(
  rawPieDataSelector,
  R.pipe(
    R.map(R.prop('expenses')),
    R.sum
  )
)
const totalIncomeSelector = createSelector(
  rawPieDataSelector,
  R.pipe(
    R.map(R.prop('income')),
    R.sum
  )
)

const percentOf = (value, total) => Math.round((100 * value) / total)
const mapCategory = R.when(
  R.isNil,
  R.always({ color: '#B3B3B3', name: '#Uncategorized' })
)
const sortByValueDescend = R.sortBy(
  R.pipe(
    R.prop('value'),
    R.negate
  )
)
export const pieChartDataSelector = createSelector(
  rawPieDataSelector,
  totalExpensesSelector,
  totalIncomeSelector,
  (list, totalExpenses, totalIncome) =>
    R.converge((...args) => R.zipObj(['income', 'spending'], args), [
      R.pipe(
        R.filter(({ income }) => income > 0),
        R.map(({ income: value, category }) => ({
          value: percentOf(value, totalIncome),
          ...mapCategory(category),
        })),
        sortByValueDescend
      ),
      R.pipe(
        R.filter(({ expenses }) => expenses > 0),
        R.map(({ expenses: value, category }) => ({
          value: percentOf(value, totalExpenses),
          ...mapCategory(category),
        })),
        sortByValueDescend
      ),
    ])(list)
)
