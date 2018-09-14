import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction('onboarding/load')
export const goNext = createDeferredAction('onboarding/next')
export const goBack = createDeferredAction('onboarding/back')

export const bankNameType = createAction('onboarding/bank/search')
export const banksResetSearch = createAction('onboarding/bank/reset-search')
export const loadBanks = createDeferredAction('onboarding/bank/load')

export const bankSelect = createAction('onboarding/bank/select')

export const leave = createAction('onboarding/leave')

// Team Invite Drawer
export const submitInvite = createAction('onboarding/team/invite')
