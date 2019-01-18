import { fromJS } from 'immutable'
import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'
import { REDUCER_NAME } from './constants'

const initialState = fromJS({
  loaded: false,
  loading: false,
  inviteToken: null,
  profiles: null,
  ownProfileId: null,
  otherProfileIds: null,
  welcomePopupOpen: false,
  leaveTeamConfirmationPopupOpen: false,
  inviteDrawerOpen: false,
  inviteDrawerLoading: false,
  changePasswordPopupOpen: false,
  changePasswordSnackShown: false,
  acceptingInvite: false,
})

const teamReducer = handleActions(
  {
    [ACTIONS.load]: state => state.merge({ loaded: false, loading: true }),

    [ACTIONS.load.error]: state =>
      state.merge({ loaded: false, loading: false }),

    [ACTIONS.load.success]: (
      state,
      { payload: { inviteToken, code, team, invite, self, others, invites } }
    ) =>
      state.merge({
        loaded: true,
        loading: false,
        inviteToken,
        welcomePopupOpen: code === 'outdated',
        leaveTeamConfirmationPopupOpen: code === 'lastTeamMember',
        team: fromJS(team),
        invite: fromJS(invite),
        invites,
        profiles: R.fromPairs([self, ...others].map(x => [x.pid, x])),
        ownProfilePid: self.pid,
        otherProfilePids: others.map(R.prop('pid')),
      }),

    [ACTIONS.acknowledgeInvite]: state => state.set('welcomePopupOpen', false),

    [ACTIONS.acceptInvite]: state => state.set('acceptingInvite', true),

    [ACTIONS.acceptInvite.success]: state =>
      state.set('acceptingInvite', false),

    [ACTIONS.acceptInvite.error]: state => state.set('acceptingInvite', false),

    [ACTIONS.rejectInvite]: state =>
      state.merge({
        inviteToken: null,
        welcomePopupOpen: false,
        leaveTeamConfirmationPopupOpen: false,
        invite: null,
      }),

    [ACTIONS.openInviteDrawer]: state => state.set('inviteDrawerOpen', true),

    [ACTIONS.closeInviteDrawer]: state => state.set('inviteDrawerOpen', false),

    [ACTIONS.changePassword.success]: state =>
      state.set('changePasswordSnackShown', true),

    [ACTIONS.openChangePasswordPopup]: state =>
      state.set('changePasswordPopupOpen', true),

    [ACTIONS.hideChangePasswordSnack]: state =>
      state.set('changePasswordSnackShown', false),

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
