import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import { format } from 'date-fns/fp'
import { formatMonth, parseMonth } from 'utils/dates'
import {
  parseQueryStringNumber,
  parseQueryStringBool,
  parseQueryString,
} from 'utils/querystring'
import { PAGE_SIZE, SORT_BY_DEFAULT, SORT_BY } from './constants'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const isUpdatingSelector = get('updating')
export const isTypingSelector = get('typing')
export const recipientsTotalCountSelector = get('recipientsCount')
export const recipientsSelector = createPlainObjectSelector(get('recipients'))

const propContainsText = (prop, text) => x =>
  (x[prop] || '').toLowerCase().includes(text.toLowerCase())

// Filters

export const currentPageSelector = createSelector(
  queryParamSelector('page'),
  page => parseQueryStringNumber(page) || 1
)

export const searchTextSelector = createSelector(
  queryParamSelector('search'),
  string => parseQueryString(string)
)

export const listDisabledSelector = createSelector(
  isUpdatingSelector,
  isTypingSelector,
  (updating, typing) => updating || typing
)

export const includeRecipientsFilterSelector = createSelector(
  queryParamSelector('recipients'),
  query => (R.isNil(query) ? true : parseQueryStringBool(query))
)

export const includeDonorsFilterSelector = createSelector(
  queryParamSelector('donors'),
  query => (R.isNil(query) ? true : parseQueryStringBool(query))
)

export const sortByFilterSelector = createSelector(
  queryParamSelector('sortBy'),
  query => (R.isNil(query) ? SORT_BY_DEFAULT : query)
)

export const filterPeerTypeSelectedValueSelector = createSelector(
  includeDonorsFilterSelector,
  includeRecipientsFilterSelector,
  (includeDonors, includeRecipients) => {
    if (includeDonors && includeRecipients) {
      return 'Donors & Recipients'
    } else if (includeDonors) {
      return 'Donors'
    } else if (includeRecipients) {
      return 'Recipients'
    }
    return 'Donors & Recipients'
  }
)

export const noResultsTextSelector = createSelector(
  includeDonorsFilterSelector,
  includeRecipientsFilterSelector,
  (includeDonors, includeRecipients) => {
    if (includeDonors && includeRecipients) {
      return 'donors or recipients'
    } else if (includeDonors) {
      return 'donors'
    } else if (includeRecipients) {
      return 'recipients'
    }
    return 'donors or recipients'
  }
)

export const filterSortBySelectedValueSelector = createSelector(
  sortByFilterSelector,
  value =>
    R.pipe(
      R.find(R.propEq('query', value)),
      R.prop('name'),
      R.toLower,
      R.concat('By ')
    )(SORT_BY)
)

// Table

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

const formatTotalDesc = total => {
  const absTotal = Math.abs(total)

  if (absTotal > 100000) {
    return '100K+'
  } else if (absTotal > 10000) {
    return '10-100K'
  } else if (absTotal > 5000) {
    return '5-10K'
  } else if (absTotal > 100) {
    return '100-5K'
  }
  return '0-99'
}

const recipientsGroupedByTotal = R.pipe(
  R.groupBy(({ total }) => formatTotalDesc(total)),
  R.toPairs,
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

const recipientsGroupedByDate = R.pipe(
  R.groupBy(({ lastPaymentDate: date }) => formatMonth(date)),
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

export const dataSourceSelector = createSelector(
  recipientsSelector,
  queryParamSelector('sortBy'),
  (recipients, sortBy) => {
    if (sortBy === 'date') {
      return recipientsGroupedByDate(recipients)
    } else if (sortBy === 'total') {
      return recipientsGroupedByTotal(recipients)
    }
    return recipientsGroupedByName(recipients)
  }
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
