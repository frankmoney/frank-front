import * as R from 'ramda'
import { isDirty, isInvalid, getFormValues } from 'redux-form/immutable'
import { createSelector } from 'reselect'
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
export const publishing = id => get('meta', id, 'publishing')
export const paymentData = id =>
  createPlainObjectSelector(getFormValues(getFormName(id)))

export const canAutoSave = id =>
  createSelector(paymentData(id), payment => !!payment && !payment.verified)

export const clipboard = createPlainObjectSelector(get('clipboard'))

export const canPaste = createSelector(clipboard, R.complement(R.isNil))
