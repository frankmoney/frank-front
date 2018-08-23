import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import { isSameYear, format } from 'date-fns/fp'
import { parseDate, formatMonth, parseMonth } from 'utils/dates'
import { parseQueryStringNumber } from './utils'
import { PAGE_SIZE } from './constants'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const listIsUpdatingSelector = get('updatingList')
export const paymentCountSelector = get('paymentCount')
export const recipientSelector = createPlainObjectSelector(get('recipient'))
export const paymentsSelector = createPlainObjectSelector(get('payments'))

export const paymentsIdsSelector = createSelector(
  paymentsSelector,
  R.map(R.prop('id'))
)

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
  paymentCountSelector,
  count => Math.ceil(count / PAGE_SIZE)
)

// Filters

export const currentPageSelector = createSelector(
  queryParamSelector('page'),
  page => parseQueryStringNumber(page) || 1
)
