import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'
import { REDUCER_NAME } from './constants'

const initialState = fromJS({
  loaded: false,
  loading: false,
  id: null,
  accounts: [],
  profile: null,
})

const teamReducer = handleActions(
  {
    [ACTIONS.load]: (state, { payload: { id } }) =>
      fromJS({
        loaded: false,
        loading: true,
        id,
      }),
    [ACTIONS.load.success]: (state, { payload: { accounts, profile } }) =>
      profile.id === state.get('id')
        ? state.merge({
            loaded: true,
            loading: true,
            accounts,
            profile,
          })
        : state,
    [ACTIONS.submit.success]: (state, { payload: profile }) =>
      profile.id === state.get('id')
        ? state.merge({
            profile,
          })
        : state,
    [ACTIONS.leave]: () => initialState,
    [ACTIONS.change]: (state, { payload }) =>
      state.update('profile', profile => profile.merge(payload)),
  },
  initialState
)

export default teamReducer

export const name = REDUCER_NAME
