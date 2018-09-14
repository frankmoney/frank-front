import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { isValid as isFormValid } from 'redux-form/immutable'
import { REDUCER_KEY } from './reducer'
import { STEPS, CREDENTIALS_FORM } from './constants'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const loadingSelector = get('loading')
export const loadedSelector = get('loaded')
export const loadingNextSelector = get('loadingNext')
export const loadingBackSelector = get('loadingBack')
export const currentStepSelector = get('currentStep')

export const canGoBackSelector = createSelector(
  currentStepSelector,
  R.pipe(
    R.indexOf(R.__, STEPS),
    R.gt(R.__, 0)
  )
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

export const selectedBankIdSelector = get('stepData', 'selectedBank', 'code')
export const selectedBankNameSelector = get('stepData', 'selectedBank', 'name')
export const selectedBankLogoSelector = get(
  'stepData',
  'selectedBank',
  'mediumLogoUrl'
)

// Credentials
const isCredentialsFormValid = isFormValid(CREDENTIALS_FORM)

export const credentialsFieldsSelector = createPlainObjectSelector(
  get('stepData', 'fields')
)

export const categoriesSelector = createPlainObjectSelector(
  get('categories', 'list')
)

export const teamMembersSelector = createPlainObjectSelector(
  get('team', 'list')
)

export const canGoNextSelector = createSelector(
  currentStepSelector,
  selectedBankIdSelector,
  isCredentialsFormValid,
  (step, selectedBankId, isCredentialsValid) =>
    (step === 'bank' && !!selectedBankId) ||
    (step === 'credentials' && isCredentialsValid)
)
