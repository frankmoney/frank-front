import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_NAME } from './constants'

const getter = (...path) => s => s.getIn([REDUCER_NAME, ...path])

const getters = {
  loaded: getter('loaded'),
  loading: getter('loading'),
  id: getter('id'),
  lastName: getter('lastName'),
  firstName: getter('firstName'),
  admin: getter('admin'),
  canInvite: getter('canInvite'),
  access: getter('access'),
  accessItems: getter('accessItems'),
}

export const loadedSelector = getters.loaded
export const loadingSelector = getters.loading

export const idSelector = getters.id
export const lastNameSelector = getters.lastName
export const firstNameSelector = getters.firstName

export const adminSelector = getters.admin
export const canInviteSelector = getters.canInvite
export const accessSelector = getters.access

export const accessItemsSelector = createPlainObjectSelector(
  getters.accessItems
)
