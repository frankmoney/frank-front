import { mergeQuery } from '@frankmoney/webapp'
import { formatDate } from 'utils/dates'
import FILTER_ACTIONS from 'containers/admin/Filters/actions'
import * as SELECTORS from '../selectors'

export default (action$, store) =>
  action$
    .ofType(FILTER_ACTIONS.apply)
    .filter(() => SELECTORS.loaded(store.getState()))
    .map(({ payload: { sum, date, verified, pending } }) =>
      mergeQuery({
        amountMin: sum && sum.min,
        amountMax: sum && sum.max,
        dateMin: date && date.from && formatDate(date.from),
        dateMax: date && date.to && formatDate(date.to),
        verified,
        pending,
        page: null,
      })
    )
