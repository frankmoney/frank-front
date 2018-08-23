import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'recipient'

const defaultState = Immutable.fromJS({
  loading: true,
  loaded: false,
  recipient: null,
  paymentCount: 0,
  payments: [],
})

export default handleActions(
  {
    [ACTIONS.load]: (state, { payload: { updateListOnly } }) =>
      state.merge(updateListOnly ? { updatingList: true } : { loading: true }),
    [ACTIONS.load.success]: (
      state,
      { payload: { recipient, payments, paymentCount } }
    ) =>
      state.merge({
        loading: false,
        loaded: true,
        updatingList: false,
        recipient: fromJS(recipient),
        payments: fromJS(payments),
        paymentCount,
      }),
    [ACTIONS.load.error]: state => state.merge({ loading: false }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
