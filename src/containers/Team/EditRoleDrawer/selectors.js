import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_NAME } from './constants'

const getter = (...path) => s => s.getIn([REDUCER_NAME, ...path])

const getters = {
  loaded: getter('loaded'),
  loading: getter('loading'),
  id: getter('id'),
  accounts: getter('accounts'),
  profile: getter('profile'),
  lastName: getter('profile', 'lastName'),
  firstName: getter('profile', 'firstName'),
  admin: getter('profile', 'admin'),
  canInvite: getter('profile', 'canInvite'),
  accountIds: getter('profile', 'accountIds'),
}

export const loadedSelector = getters.loaded
export const loadingSelector = getters.loading

export const idSelector = getters.id

export const accountsSelector = createPlainObjectSelector(getters.accounts)

export const lastNameSelector = getters.lastName
export const firstNameSelector = getters.firstName

export const adminSelector = getters.admin
export const canInviteSelector = getters.canInvite
export const accountIdsSelector = createPlainObjectSelector(getters.accountIds)
