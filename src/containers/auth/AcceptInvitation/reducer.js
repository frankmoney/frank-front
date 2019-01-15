import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'auth/acceptInvitation'

const initialState = {
  loading: true,
  loaded: false,
  token: null,
  invite: null,
}

export default handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loading: true, loaded: false }),
    [ACTIONS.load.error]: state => state.set('loading', false),
    [ACTIONS.load.success]: (state, { payload: { token, invite } }) =>
      state.merge({ loading: false, loaded: true, token, invite }),
    [ACTIONS.leave]: () => fromJS(initialState),
  },
  fromJS(initialState)
)
