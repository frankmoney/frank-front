import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])
const getFilters = (...prop) => get('filtersEdit', ...prop)

export const searchTextSelector = get('searchText')
export const isLoadingSelector = get('loading')
export const transactionsTotalCountSelector = get('transactionsCount')
export const transactionsSelector = createPlainObjectSelector(
  get('transactions')
)

const propContainsText = (prop, text) => x =>
  (x[prop] || '').toLowerCase().includes(text.toLowerCase())

const filterTransactionByText = text =>
  text
    ? R.anyPass([
        propContainsText('description', text),
        propContainsText('categoryName', text),
      ])
    : R.always(true)

export const transactionsIdsSelector = createSelector(
  transactionsSelector,
  get('searchText'),
  (list, searchText) =>
    R.pipe(
      R.filter(filterTransactionByText(searchText)),
      R.map(R.prop('id'))
    )(list)
)

export const dataSourceSelector = createSelector(
  transactionsIdsSelector,
  ids => [{ title: 'April', rows: ids }]
)

export const rowDataSelector = id =>
  createSelector(
    transactionsSelector,
    R.find(x => x.id.toString() === id.toString())
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
