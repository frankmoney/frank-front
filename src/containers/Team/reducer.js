import { fromJS } from 'immutable'
import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'
import { REDUCER_NAME } from './constants'
import EDIT_ROLE_ACTIONS from './EditRoleDrawer/actions'

const initialState = fromJS({
  loaded: false,
  loading: false,
  profiles: null,
  ownProfileId: null,
  otherProfileIds: null,
})

const teamReducer = handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loaded: false, loading: true }),
    [ACTIONS.load.error]: state =>
      state.merge({ loaded: false, loading: false }),
    [ACTIONS.load.success]: (state, { payload: { self, others } }) =>
      state.merge({
        loaded: true,
        loading: false,
        profiles: R.fromPairs([self, ...others].map(x => [x.id, x])),
        ownProfileId: self.id,
        otherProfileIds: others.map(R.prop('id')),
      }),
    [ACTIONS.updateRole]: (state, { payload: { id, role } }) =>
      state.setIn(['profiles', id, 'role'], role),
    [ACTIONS.leave]: () => initialState,
    [EDIT_ROLE_ACTIONS.submit.success]: (state, { payload: profile }) =>
      state.mergeIn(['profiles', profile.id], profile),
  },
  initialState
)

export default teamReducer

export const name = REDUCER_NAME
