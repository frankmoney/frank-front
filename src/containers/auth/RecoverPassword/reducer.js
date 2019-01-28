import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'auth/recoverPassword'

const defaultState = fromJS({
  sentTo: null,
})

export default handleActions(
  {
    [ACTIONS.submit]: (state, { payload: { email } }) =>
      state.set('sentTo', email),
  },
  defaultState
)
