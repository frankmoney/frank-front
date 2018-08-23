import Immutable, { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as ACTIONS from './actions'

export const REDUCER_KEY = 'directory'

const defaultState = Immutable.fromJS({
  loading: true,
  updating: false,
  loaded: false,
  recipients: [],
})

export default handleActions(
  {
    [ACTIONS.load]: (state, { payload: { update } }) =>
      state.merge(update ? { updating: true } : { loading: true }),
    [ACTIONS.load.success]: (state, { payload: { recipients } }) =>
      state.merge({
        loading: false,
        updating: false,
        loaded: true,
        recipients: fromJS(recipients),
      }),
    [ACTIONS.load.error]: state => state.merge({ loading: false }),
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
