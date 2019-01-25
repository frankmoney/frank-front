// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { format } from 'date-fns/fp'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import type { ReduxState } from 'flow/redux'
import { formatMonth, parseMonth } from 'utils/dates'
import { parseQueryStringNumber } from './utils'
import { PAGE_SIZE, SORT_BY, SORT_BY_DEFAULT } from './constants'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const listIsUpdatingSelector = get('updatingList')
export const categoriesSelector = createPlainObjectSelector(get('categories'))
export const paymentCountSelector = get('paymentCount')
export const recipientSelector = createPlainObjectSelector(get('recipient'))
export const paymentsSelector = createPlainObjectSelector(get('payments'))

// Filters

export const currentPageSelector = createSelector(
  queryParamSelector('page'),
  page => parseQueryStringNumber(page) || 1
)

export const sortByFilterSelector = createSelector(
  queryParamSelector('sortBy'),
  query => (R.isNil(query) ? SORT_BY_DEFAULT : query)
)

export const filterSortBySelectedValueSelector = createSelector(
  sortByFilterSelector,
  value =>
    R.pipe(
      R.find(R.propEq('id', value)),
      R.prop('name'),
      R.toLower,
      R.concat('By ')
    )(SORT_BY)
)

// Table

export const paymentsIdsSelector = createSelector(
  paymentsSelector,
  R.map(R.prop('id'))
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

const paymentsGroupedByTotal = R.pipe(
  R.groupBy(({ amount }) => formatTotalDesc(amount)),
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

const paymentsGroupedByDate = R.pipe(
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

export const dataSourceSelector = createSelector(
  paymentsSelector,
  sortByFilterSelector,
  (recipients, sortBy) => {
    if (sortBy === 'amount') {
      return paymentsGroupedByTotal(recipients)
    }
    return paymentsGroupedByDate(recipients)
  }
)

export const rowDataSelector = id =>
  createSelector(
    paymentsSelector,
    R.find(x => x.id.toString() === id.toString())
  )

export const totalPagesSelector = createSelector(paymentCountSelector, count =>
  Math.ceil(count / PAGE_SIZE)
)
