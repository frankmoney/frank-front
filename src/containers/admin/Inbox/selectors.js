import { queryParamSelector } from '@frankmoney/webapp'
import { createPlainObjectSelector } from '@frankmoney/utils'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { parseDate } from 'utils/dates'
import { parseQueryStringBool, parseQueryStringNumber } from 'utils/querystring'
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const loading = get('loading')
export const loaded = get('loaded')
export const listReloading = get('updatingList')

export const currentFilters = createSelector(
  queryParamSelector('amountMin'),
  queryParamSelector('amountMax'),
  queryParamSelector('dateMin'),
  queryParamSelector('dateMax'),
  queryParamSelector('pending'),
  (amountMin, amountMax, dateMin, dateMax, pending) => ({
    amountMin: parseQueryStringNumber(amountMin),
    amountMax: parseQueryStringNumber(amountMax),
    dateMin: dateMin ? parseDate(dateMin) : null,
    dateMax: dateMax ? parseDate(dateMax) : null,
    pending: parseQueryStringBool(pending),
  })
)

export const currentFiltersCount = createSelector(
  queryParamSelector('amountMin'),
  queryParamSelector('amountMax'),
  queryParamSelector('dateMin'),
  queryParamSelector('dateMax'),
  queryParamSelector('pending'),
  R.unapply(
    R.pipe(
      R.filter(x => typeof x !== 'undefined' && x !== ''),
      R.length
    )
  )
)

export const categories = createPlainObjectSelector(get('categories'))
export const payments = createPlainObjectSelector(get('payments'))

export const isPaymentSaving = R.memoizeWith(R.identity, id =>
  createSelector(get('paymentIdsSaving'), ids => ids.has(id))
)
export const isPaymentPublishing = R.memoizeWith(R.identity, id =>
  createSelector(get('paymentIdsPublishing'), ids => ids.has(id))
)

// PAGINATION
export const paymentsCount = get('paymentsCount')
export const currentPage = createSelector(
  queryParamSelector('page'),
  page => parseQueryStringNumber(page) || 1
)
export const totalPages = createSelector(paymentsCount, count =>
  Math.ceil(count / PAGE_SIZE)
)
export const noResults = createSelector(paymentsCount, x => x === 0)
