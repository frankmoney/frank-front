import { queryParamSelector } from '@frankmoney/webapp'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { parseDate } from 'utils/dates'
import { parseQueryStringBool, parseQueryStringNumber } from 'utils/querystring'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const loading = get('loading')

export const currentFiltersSelector = createSelector(
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

export const currentFiltersCountSelector = createSelector(
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
