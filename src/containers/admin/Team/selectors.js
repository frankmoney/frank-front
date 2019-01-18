import { createPlainObjectSelector } from '@frankmoney/utils'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { REDUCER_NAME } from './constants'

const getter = (...path) => s => s.getIn([REDUCER_NAME, ...path])

const getters = {
  loaded: getter('loaded'),
  loading: getter('loading'),
  acceptingInvite: getter('acceptingInvite'),
  welcomePopupOpen: getter('welcomePopupOpen'),
  leaveTeamConfirmationPopupOpen: getter('leaveTeamConfirmationPopupOpen'),
  inviteDrawerOpen: getter('inviteDrawerOpen'),
  inviteDrawerLoading: getter('inviteDrawerLoading'),
  changePasswordPopupOpen: getter('changePasswordPopupOpen'),
  changePasswordSnackShown: getter('changePasswordSnackShown'),
  changeTeamNameSnackShown: getter('changeTeamNameSnackShown'),
  inviteToken: getter('inviteToken'),
  team: getter('team'),
  invite: getter('invite'),
  profiles: getter('profiles'),
  ownProfilePid: getter('ownProfilePid'),
  otherProfilePids: getter('otherProfilePids'),
  invites: getter('invites'),
}

export const loadedSelector = getters.loaded
export const loadingSelector = getters.loading

export const acceptingInviteSelector = getters.acceptingInvite

export const welcomePopupOpenSelector = getters.welcomePopupOpen

export const leaveTeamConfirmationPopupOpenSelector =
  getters.leaveTeamConfirmationPopupOpen

export const inviteDrawerOpenSelector = getters.inviteDrawerOpen
export const inviteDrawerSubmittingSelector = getters.inviteDrawerLoading

export const changePasswordPopupOpen = getters.changePasswordPopupOpen
export const changePasswordSnackShownSelector = getters.changePasswordSnackShown

export const changeTeamNameSnackShownSelector = getters.changeTeamNameSnackShown

export const inviteTokenSelector = getters.inviteToken

export const teamSelector = createPlainObjectSelector(getters.team)

export const inviteSelector = createPlainObjectSelector(getters.invite)

export const inviteCreatorSelector = createSelector(
  inviteSelector,
  R.path(['creator', 'firstName'])
)

export const inviteTeamSelector = createSelector(
  inviteSelector,
  R.path(['team', 'name'])
)

export const ownProfileSelector = createPlainObjectSelector(
  createSelector(
    getters.profiles,
    getters.ownProfilePid,
    (profiles, pid) => profiles && profiles.get(pid)
  )
)

export const otherProfilesSelector = createPlainObjectSelector(
  createSelector(
    getters.profiles,
    getters.otherProfilePids,
    (profiles, pids) => pids && pids.map(pid => profiles.get(pid))
  )
)

export const canInviteSelector = createSelector(
  createSelector(ownProfileSelector, R.prop('role')),
  role => role === 'manager' || role === 'administrator'
)

export const invitesSelector = createPlainObjectSelector(getters.invites)

export const teamIdSelector = getter('team', 'id')
