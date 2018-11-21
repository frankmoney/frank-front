import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import { isSameYear, format } from 'date-fns/fp'
import { remapPieData, sumProp } from 'data/models/pieData'
import { parseDate, formatMonth, parseMonth } from 'utils/dates'
import {
  parseQueryStringNumber,
  parseQueryStringBool,
  parseQueryString,
} from 'utils/querystring'
import { UNCATEGORIZED_CATEGORY } from '../../../const'
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])
const getFilters = (...prop) => get('filtersEdit', ...prop)

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const listIsUpdatingSelector = get('updatingList')
export const isTypingSelector = get('typing')
export const paymentsTotalCountSelector = get('paymentsCount')
export const categoriesSelector = createPlainObjectSelector(get('categories'))
export const paymentCardCategoriesSelector = createSelector(
  categoriesSelector,
  R.insert(0, UNCATEGORIZED_CATEGORY)
)

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
  currentFiltersSelector,
  R.pipe(
    R.toPairs,
    R.filter(([_, v]) => !!v),
    R.length
  )
)

export const periodSelector = () => 'All time' // TODO: get data from filter and formatter from DateRangeField

// Chart Selectors

export const chartCategoryTypeSelector = get('chartCategoryType')

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

export const searchingSuggestionsSelector = get('searchingSuggestions')

export const suggestedPeersSelector = createPlainObjectSelector(
  get('suggestedPeers')
)

export const suggestedDescriptionsSelector = createPlainObjectSelector(
  get('suggestedDescriptions')
)
