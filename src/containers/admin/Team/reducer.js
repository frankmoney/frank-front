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
  inviteDrawerLoading: false,
  changePasswordPopupOpen: false,
})

const teamReducer = handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loaded: false, loading: true }),

    [ACTIONS.load.error]: state =>
      state.merge({ loaded: false, loading: false }),

    [ACTIONS.load.success]: (
      state,
      { payload: { team, self, others, invites } }
    ) =>
      state.merge({
        loaded: true,
        loading: false,
        team: fromJS(team),
        invites,
        profiles: R.fromPairs([self, ...others].map(x => [x.pid, x])),
        ownProfilePid: self.pid,
        otherProfilePids: others.map(R.prop('pid')),
      }),

    [ACTIONS.openInviteDrawer]: state => state.set('inviteDrawerOpen', true),

    [ACTIONS.closeInviteDrawer]: state => state.set('inviteDrawerOpen', false),

    [ACTIONS.openChangePasswordPopup]: state =>
      state.set('changePasswordPopupOpen', true),

    [ACTIONS.invite]: state => state.set('inviteDrawerLoading', true),
    [ACTIONS.invite.success]: (state, { payload: invite }) =>
      state
        .set('inviteDrawerOpen', false)
        .set('inviteDrawerLoading', false)
        .update('invites', list => list.push(invite)),
    [ACTIONS.leave]: () => initialState,
  },
  initialState
)

export default teamReducer

export const name = REDUCER_NAME
