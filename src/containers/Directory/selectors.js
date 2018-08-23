import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'
import { parseQueryStringNumber } from './utils'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const isUpdatingSelector = get('updating')
export const recipientsTotalCountSelector = get('recipientsCount')
export const recipientsSelector = createPlainObjectSelector(get('recipients'))

const propContainsText = (prop, text) => x =>
  (x[prop] || '').toLowerCase().includes(text.toLowerCase())

const filterRecipientsByText = text =>
  text
    ? R.anyPass([
        propContainsText('peerName', text),
        propContainsText('categoryName', text),
      ])
    : R.always(true)

export const recipientsIdsSelector = createSelector(
  recipientsSelector,
  get('searchText'),
  (list, searchText) =>
    R.pipe(
      R.filter(filterRecipientsByText(searchText)),
      R.map(R.prop('id'))
    )(list)
)

export const hasNoResultsSelector = createSelector(
  recipientsSelector,
  R.isEmpty
)

const recipientsGroupedByName = R.pipe(
  R.groupBy(
    R.pipe(
      R.prop('name'),
      R.head
    )
  ),
  R.toPairs,
  // R.map(row => ({ title: row[0], rows: R.map(R.prop('id'), row[1]) }))
  R.map(
    R.converge((title, rows) => ({ title, rows }), [
      R.head,
      R.pipe(
        R.last,
        R.map(R.prop('id'))
      ),
    ])
  )
)

export const dataSourceSelector = createSelector(
  recipientsSelector,
  recipientsGroupedByName
)

export const rowDataSelector = id =>
  createSelector(
    recipientsSelector,
    R.find(x => x.id.toString() === id.toString())
  )

export const totalPagesSelector = createSelector(
  recipientsTotalCountSelector,
  count => Math.ceil(count / PAGE_SIZE)
)

// Filters

export const currentPageSelector = createSelector(
  queryParamSelector('page'),
  page => parseQueryStringNumber(page) || 1
)

export const searchTextSelector = queryParamSelector('search')
