import { isDirty, getFormValues } from 'redux-form/immutable'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { getFormName } from './const'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => state => state.getIn([REDUCER_KEY, ...prop])

export const descriptionChanged = id => {
  const isDirtySelector = isDirty(getFormName(id))

  return state => isDirtySelector(state, ['description'])
}

export const categoryChanged = id => {
  const isDirtySelector = isDirty(getFormName(id))

  return state => isDirtySelector(state, ['categoryId'])
}

export const peerChanged = id => {
  const isDirtySelector = isDirty(getFormName(id))

  return state => isDirtySelector(state, ['peerName'])
}

export const saving = id => get('meta', id, 'saving')
export const cascadeCount = id => get('meta', id, 'cascadeCount')
export const publishing = id => get('meta', id, 'publishing')
export const paymentData = id =>
  createPlainObjectSelector(getFormValues(getFormName(id)))
