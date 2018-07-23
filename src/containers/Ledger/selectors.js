import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const getIn = prop => store => store.getIn([REDUCER_KEY, prop])
const getters = {
  searchText: getIn('searchText'),
  transactions: getIn('transactions'),
}

export const searchTextSelector = getters.searchText
export const transactionsSelector = createPlainObjectSelector(
  getters.transactions
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
  getters.searchText,
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
