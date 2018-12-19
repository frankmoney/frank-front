import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'auth/signIn'

const initialState = fromJS({
  busy: false,
})

const signInReducer = handleActions(
  {
    [ACTIONS.load]: state => state.merge({ busy: false }),
    [ACTIONS.leave]: () => initialState,
    [ACTIONS.signIn]: state => state.merge({ busy: true }),
    [ACTIONS.signIn.error]: state => state.merge({ busy: false }),
  },
  initialState
)

export default signInReducer
