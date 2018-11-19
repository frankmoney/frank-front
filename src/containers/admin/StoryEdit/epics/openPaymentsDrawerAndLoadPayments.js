import ACTIONS from '../actions'

export default action$ =>
  action$.ofType(ACTIONS.openPaymentsDrawer).map(ACTIONS.filterPayments)
