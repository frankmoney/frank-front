import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_NAME } from './constants'

const getter = (...path) => s => s.getIn([REDUCER_NAME, ...path])

const getters = {
  loaded: getter('loaded'),
  loading: getter('loading'),
  accounts: getter('accounts'),
  admin: getter('profile', 'admin'),
  canInvite: getter('profile', 'canInvite'),
  accountIds: getter('profile', 'accountIds'),
  email: getter('profile', 'email'),
  note: getter('profile', 'note'),
}

export const loadedSelector = getters.loaded
export const loadingSelector = getters.loading

export const accountsSelector = createPlainObjectSelector(getters.accounts)

export const adminSelector = getters.admin
export const canInviteSelector = getters.canInvite
export const accountIdsSelector = createPlainObjectSelector(getters.accountIds)
export const emailSelector = getters.email
export const noteSelector = getters.note
