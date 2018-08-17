import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.filtersApply)
    .map(({ payload: { sumLimit, dateLimit, verified } }) =>
      mergeQuery({
        amountMin: sumLimit && sumLimit.min,
        amountMax: sumLimit && sumLimit.max,
        dateMin: dateLimit && dateLimit.min,
        dateMax: dateLimit && dateLimit.max,
        verified,
      })
    )
