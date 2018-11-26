import { mergeQuery } from '@frankmoney/webapp'
import { formatDate } from 'utils/dates'
import FILTER_ACTIONS from 'containers/admin/Filters/actions'
import * as SELECTORS from '../selectors'

export default (action$, store) =>
  action$
    .ofType(FILTER_ACTIONS.apply)
    .filter(() => SELECTORS.loaded(store.getState()))
    .map(({ payload: { sumLimit, dateLimit, pending } }) =>
      mergeQuery({
        amountMin: sumLimit && sumLimit.min,
        amountMax: sumLimit && sumLimit.max,
        dateMin: dateLimit && dateLimit.from && formatDate(dateLimit.from),
        dateMax: dateLimit && dateLimit.to && formatDate(dateLimit.to),
        pending,
        page: null,
      })
    )
