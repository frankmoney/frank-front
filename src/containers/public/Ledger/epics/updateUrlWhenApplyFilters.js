import { mergeQuery } from '@frankmoney/webapp'
import { formatDate } from 'utils/dates'
import FILTER_ACTIONS from 'containers/admin/Filters/actions'
import { loadedSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(FILTER_ACTIONS.apply)
    .filter(() => loadedSelector(store.getState()))
    .map(({ payload: { sumLimit, dateLimit, verified } }) =>
      mergeQuery({
        amountMin: sumLimit && sumLimit.min,
        amountMax: sumLimit && sumLimit.max,
        dateMin: dateLimit && dateLimit.from && formatDate(dateLimit.from),
        dateMax: dateLimit && dateLimit.to && formatDate(dateLimit.to),
        verified,
        page: null,
      })
    )
