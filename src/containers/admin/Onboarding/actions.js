import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export const load = createDeferredAction('onboarding/load')
export const goNext = createDeferredAction('onboarding/next')
export const goBack = createDeferredAction('onboarding/back')
export const backToCredentials = createDeferredAction(
  'onboarding/back-credentials'
)
export const cancel = createDeferredAction('onboarding/cancel')
export const leave = createAction('onboarding/leave')

// Step: Banks
export const bankNameType = createAction('onboarding/bank/search')
export const banksResetSearch = createAction('onboarding/bank/reset-search')
export const loadBanks = createDeferredAction('onboarding/bank/load')
export const bankSelect = createAction('onboarding/bank/select')

// Step: Categories
export const addNewCategory = createAction('onboarding/categories/start-add')
export const editCategory = createAction('onboarding/categories/start-edit')
export const cancelEditCategory = createAction(
  'onboarding/categories/cancel-add'
)
export const submitEditCategory = createAction(
  'onboarding/categories/submit-add'
)
export const cleanAllCategories = createAction('onboarding/categories/clean')
export const removeCategory = createAction('onboarding/categories/remove')

// Step: Accounts
export const accountSelect = createAction('onboarding/accounts/select')

// Step: Team
export const openInvite = createAction('onboarding/team/open-invite')
export const closeInvite = createAction('onboarding/team/close-invite')
export const submitInvite = createAction('onboarding/team/invite')

// Step: Terms
export const acceptTerms = createDeferredAction('onboarding/terms/accept')
