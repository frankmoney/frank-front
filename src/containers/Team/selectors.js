import { createPlainObjectSelector } from '@frankmoney/utils'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { REDUCER_NAME } from './constants'

const getter = (...path) => s => s.getIn([REDUCER_NAME, ...path])

const getters = {
  loaded: getter('loaded'),
  loading: getter('loading'),
  profiles: getter('profiles'),
  ownProfileId: getter('ownProfileId'),
  otherProfileIds: getter('otherProfileIds'),
}

export const loadedSelector = getters.loaded
export const loadingSelector = getters.loading

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
  ownProfileSelector,
  R.prop('canInvite')
)
