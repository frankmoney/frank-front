import { createPlainObjectSelector } from '@frankmoney/utils'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { REDUCER_NAME } from './constants'

const getter = (...path) => s => s.getIn([REDUCER_NAME, ...path])

const getters = {
  loaded: getter('loaded'),
  loading: getter('loading'),
  inviteDrawerOpen: getter('inviteDrawerOpen'),
  changePasswordPopupOpen: getter('changePasswordPopupOpen'),
  profiles: getter('profiles'),
  ownProfilePid: getter('ownProfilePid'),
  otherProfilePids: getter('otherProfilePids'),
}

export const loadedSelector = getters.loaded
export const loadingSelector = getters.loading

export const inviteDrawerOpenSelector = getters.inviteDrawerOpen
export const changePasswordPopupOpen = getters.changePasswordPopupOpen

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
  role => role === 'administrator'
)
