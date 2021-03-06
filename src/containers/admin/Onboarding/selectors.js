// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { isValid as isFormValid, getFormValues } from 'redux-form/immutable'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'
import { STEPS, STEP_FORM, CREDENTIALS_STATUS, ACCOUNT_FORM } from './constants'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const loadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const loadingNextSelector = get('loadingNext')
export const loadingBackSelector = get('loadingBack')
export const termsAcceptedSelector = get('termsAccepted')
export const currentStepSelector = get('currentStep')

export const canGoBackSelector = createSelector(
  currentStepSelector,
  R.pipe(
    R.indexOf(R.__, STEPS),
    R.allPass([R.gt(R.__, 0), R.complement(R.equals(STEPS.length - 1))])
  )
)

export const selectedBankIdSelector = get('stepData', 'selectedBank', 'code')
export const selectedBankNameSelector = get('stepData', 'selectedBank', 'name')
export const selectedBankWebsiteSelector = get(
  'stepData',
  'selectedBank',
  'url'
)
export const selectedBankLogoSelector = get(
  'stepData',
  'selectedBank',
  'mediumLogoUrl'
)
export const sessionBankNameSelector = get('session', 'institution', 'name')
export const sessionBankImageSelector = get(
  'session',
  'institution',
  'mediumLogoUrl'
)

// Banks

export const banksLoadingSelector = get('stepData', 'loading')
export const banksLoadedSelector = get('stepData', 'loaded')
export const bankSearchSelector = get('stepData', 'search')
export const bankListSelector = createPlainObjectSelector(
  get('stepData', 'bankList')
)
export const filteredBankListSelector = createSelector(
  bankSearchSelector,
  bankListSelector,
  (search, list) =>
    search
      ? list.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
      : list
)

// Credentials && MFA
export const isMfaStepSelector = createSelector(
  currentStepSelector,
  R.equals('mfa')
)
const isCredentialsFormValid = isFormValid(STEP_FORM)
export const credentialsFormSelector = createPlainObjectSelector(
  getFormValues(STEP_FORM)
)
export const credentialsStatusSelector = get('stepData', 'status')
export const isCredentialsCheckingSelector = createSelector(
  credentialsStatusSelector,
  R.equals(CREDENTIALS_STATUS.checking)
)
export const isCredentialsErrorSelector = createSelector(
  credentialsStatusSelector,
  R.contains(R.__, [
    CREDENTIALS_STATUS.denied,
    CREDENTIALS_STATUS.failed,
    CREDENTIALS_STATUS.mfa,
  ])
)

export const isLoadingNextOrPollingSelector = createSelector(
  loadingNextSelector,
  isCredentialsCheckingSelector,
  R.or
)

export const credentialsFieldsSelector = createPlainObjectSelector(
  get('stepData', 'fields')
)

// Step: Categories
export const categoriesSelector = createPlainObjectSelector(
  get('stepData', 'list')
)
export const categoryTypeSelector = get('stepData', 'categoryType')

export const openEditCategoryDialogSelector = get('stepData', 'openEditDialog')

export const editingCategorySelector = createSelector(
  categoriesSelector,
  get('stepData', 'editingCategoryId'),
  (list, id) => id && list && R.find(R.propEq('id', id), list)
)

export const emptyCategoriesSelector = createSelector(
  categoriesSelector,
  R.isEmpty
)

// Step: Select Account
export const accountsSelector = createPlainObjectSelector(
  get('stepData', 'accounts')
)
export const selectedAccountIdSelector = get('stepData', 'selectedAccountId')

// Step: AccountInfo
const isAccountInfoFormValid = isFormValid(ACCOUNT_FORM)
export const accountInfoInitialValuesSelector = createSelector(
  get('stepData', 'accountName'),
  get('stepData', 'accountDescription'),
  (name, description) => ({ name, description })
)

export const accountInfoFormSelector = createPlainObjectSelector(
  getFormValues(ACCOUNT_FORM)
)

// Step: Team
export const isInviteDrawerOpenSelector = get('stepData', 'inviteDrawerOpen')
export const teamInvitesSelector = createPlainObjectSelector(
  get('stepData', 'invites')
)
export const teamMembersSelector = createPlainObjectSelector(
  get('stepData', 'team', 'members')
)

export const canGoNextSelector = createSelector(
  currentStepSelector,
  selectedBankIdSelector,
  isCredentialsFormValid,
  selectedAccountIdSelector,
  isAccountInfoFormValid,
  (step, selectedBankId, isCredentialsValid, accountId, isAccountInfoValid) =>
    (step === 'bank' && !!selectedBankId) ||
    (step === 'credentials' && isCredentialsValid) ||
    (step === 'mfa' && isCredentialsValid) ||
    (step === 'account' && accountId) ||
    (step === 'accountInfo' && isAccountInfoValid) ||
    step === 'categories' ||
    step === 'team' ||
    step === 'success'
)

// Step: Success
export const linkedAccountIdSelector = get('stepData', 'account', 'id')
