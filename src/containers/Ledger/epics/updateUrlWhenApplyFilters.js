import { mergeQuery } from '@frankmoney/webapp'
import { formatDate } from 'utils/dates'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.filtersApply)
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
