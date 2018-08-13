import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const getIn = prop => store => store.getIn([REDUCER_KEY, prop])
const getters = {
  searchText: getIn('searchText'),
  recipients: getIn('recipients'),
}

export const searchTextSelector = getters.searchText
export const recipientsSelector = createPlainObjectSelector(getters.recipients)

const propContainsText = (prop, text) => x =>
  (x[prop] || '').toLowerCase().includes(text.toLowerCase())

const filterRecipientByText = text =>
  text
    ? R.anyPass([
        propContainsText('name', text),
        propContainsText('categoryName', text),
      ])
    : R.always(true)

const recipientsGroupedByName = R.pipe(
  R.groupBy(
    R.pipe(
      R.prop('name'),
      R.head
    )
  ),
  R.toPairs,
  R.map(row => ({ title: row[0], rows: R.map(R.prop('id'), row[1]) }))
)

export const recipientsListSelector = createSelector(
  recipientsSelector,
  searchTextSelector,
  (list, searchText) => R.filter(filterRecipientByText(searchText))(list)
)

export const recipientsDataSourceSelector = createSelector(
  recipientsListSelector,
  recipientsGroupedByName
)

export const recipientsRowDataSelector = rowId =>
  createSelector(recipientsListSelector, R.find(R.propEq('id', rowId)))
