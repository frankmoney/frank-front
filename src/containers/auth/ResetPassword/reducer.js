import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'auth/resetPassword'

const initialState = {
  loading: true,
  loaded: false,
}

export default handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loading: true, loaded: false }),
    [ACTIONS.load.error]: state => state.set('loading', false),
    [ACTIONS.load.success]: state => state.merge({ loading: false, loaded: true }),
    [ACTIONS.leave]: () => fromJS(initialState),
  },
  fromJS(initialState)
)
