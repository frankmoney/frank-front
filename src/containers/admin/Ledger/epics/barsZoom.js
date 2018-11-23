import FILTERS_ACTIONS from 'containers/admin/Filters/actions'
import * as ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.barZoomIn)
    .map(({ payload: { dateFrom, dateTo } }) => ({
      dateLimit: {
        from: dateFrom,
        to: dateTo,
      },
    }))
    .map(FILTERS_ACTIONS.apply)
