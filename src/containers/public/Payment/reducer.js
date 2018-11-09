import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'publicPayment'

const initialState = fromJS({
  isLoaded: false,
  isLoading: false,
  account: null,
  payment: null,
})

export default handleActions(
  {
    [ACTIONS.load]: state =>
      state.merge({
        isLoading: true,
        isLoaded: false,
      }),
    [ACTIONS.load.success]: (state, { payload: { account, payment } }) =>
      state.merge({
        isLoading: false,
        isLoaded: true,
        account: fromJS(account),
        payment: fromJS(payment),
      }),
    [ACTIONS.load.error]: state =>
      state.merge({
        isLoading: false,
        isLoaded: false,
      }),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)
