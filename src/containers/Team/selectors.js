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
  ownProfileId: getter('ownProfileId'),
  otherProfileIds: getter('otherProfileIds'),
}

export const loadedSelector = getters.loaded
export const loadingSelector = getters.loading

export const inviteDrawerOpenSelector = getters.inviteDrawerOpen
export const changePasswordPopupOpen = getters.changePasswordPopupOpen

export const ownProfileSelector = createPlainObjectSelector(
  createSelector(
    getters.profiles,
    getters.ownProfileId,
    (profiles, id) => profiles && profiles.get(id)
  )
)

export const otherProfilesSelector = createPlainObjectSelector(
  createSelector(
    getters.profiles,
    getters.otherProfileIds,
    (profiles, ids) => ids && ids.map(id => profiles.get(id))
  )
)

export const canInviteSelector = createSelector(
  createSelector(ownProfileSelector, R.prop('role')),
  role => role === 'administrator'
)
