import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { queryParamSelector } from '@frankmoney/webapp'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])
const getFilters = (...prop) => get('filtersEdit', ...prop)

export const searchTextSelector = queryParamSelector('search')
export const isLoadingSelector = get('loading')
export const listIsUpdatingSelector = get('updatingList')
export const paymentsTotalCountSelector = get('paymentsCount')
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

export const paymentsIdsSelector = createSelector(
  paymentsSelector,
  get('searchText'),
  (list, searchText) =>
    R.pipe(
      R.filter(filterPaymentByText(searchText)),
      R.map(R.prop('id'))
    )(list)
)

export const dataSourceSelector = createSelector(paymentsIdsSelector, ids => [
  { title: 'April', rows: ids },
])

export const rowDataSelector = id =>
  createSelector(
    paymentsSelector,
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

const parseNullableBool = value => {
  switch (value) {
    case 'true':
      return true
    case 'false':
      return false
    default:
      return null
  }
}

export const currentFiltersSelector = createSelector(
  queryParamSelector('amountMin'),
  queryParamSelector('amountMax'),
  queryParamSelector('dateMin'),
  queryParamSelector('dateMax'),
  queryParamSelector('verified'),
  (amountMin, amountMax, dateMin, dateMax, verified) => ({
    amountMin: amountMin && parseInt(amountMin, 10),
    amountMax: amountMax && parseInt(amountMax, 10),
    dateMin,
    dateMax,
    verified: parseNullableBool(verified),
  })
)
