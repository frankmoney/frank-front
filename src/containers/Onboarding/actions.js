import { createAction } from 'redux-actions'
// import { createDeferredAction } from '@frankmoney/utils'
//

export const goNext = createAction('onboarding/next')
export const goBack = createAction('onboarding/back')
export const bankSearch = createAction('onboarding/bank/search')
export const bankSelect = createAction('onboarding/bank/select')

export const leave = createAction('onboarding/leave')
