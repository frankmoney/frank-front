import { mergeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'

export default action$ =>
  action$.ofType(ACTIONS.barZoomIn).map(({ payload: { dateFrom, dateTo } }) =>
    mergeQuery({
      dateMin: dateFrom,
      dateMax: dateTo,
    })
  )
