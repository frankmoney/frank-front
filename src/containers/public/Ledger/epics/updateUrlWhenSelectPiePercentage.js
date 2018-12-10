import { mergeQuery } from '@frankmoney/webapp'
import { PIE_TOTAL_PARAMETER_NAME } from 'data/models/pieData'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.selectPieTotal)
    .map(({ payload: pieTotal }) =>
      mergeQuery({ [PIE_TOTAL_PARAMETER_NAME]: pieTotal })
    )
