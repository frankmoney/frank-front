import { fromJS } from 'immutable'
import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'
import { REDUCER_NAME } from './constants'

const initialState = fromJS({
  loaded: false,
  loading: false,
  profiles: null,
  ownProfileId: null,
  otherProfileIds: null,
  inviteDrawerOpen: false,
  changePasswordPopupOpen: false,
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

    [ACTIONS.openInviteDrawer]: state => state.set('inviteDrawerOpen', true),

    [ACTIONS.closeInviteDrawer]: state => state.set('inviteDrawerOpen', false),

    [ACTIONS.openChangePasswordPopup]: state =>
      state.set('changePasswordPopupOpen', true),

    [ACTIONS.invite]: state => state.set('inviteDrawerOpen', false),

    [ACTIONS.updateRole]: (state, { payload: { id, role } }) =>
      state.setIn(['profiles', id, 'role'], role),

    [ACTIONS.leave]: () => initialState,
  },
  initialState
)

export default teamReducer

export const name = REDUCER_NAME
