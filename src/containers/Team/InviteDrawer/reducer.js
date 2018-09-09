import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'
import { REDUCER_NAME } from './constants'

const initialState = fromJS({
  loaded: false,
  loading: false,
  accounts: [],
  profile: null,
})

const emptyProfile = {
  accountIds: [],
}

const teamReducer = handleActions(
  {
    [ACTIONS.load]: () =>
      fromJS({
        loaded: false,
        loading: true,
      }),
    [ACTIONS.load.success]: (state, { payload: { accounts } }) =>
      state.merge({
        loaded: true,
        loading: false,
        accounts,
        profile: emptyProfile,
      }),
    [ACTIONS.leave]: () => initialState,
    [ACTIONS.change]: (state, { payload }) =>
      state.update('profile', profile => profile.merge(payload)),
  },
  initialState
)

export default teamReducer

export const name = REDUCER_NAME
