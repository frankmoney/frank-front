import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction('source/load')
export const goBack = createDeferredAction('source/back')
export const sendCredentials = createAction('source/send-credentials')
export const sendMFA = createAction('source/send-MFA')
export const updateSourceState = createAction('source/update-state')
export const leave = createAction('source/leave')
