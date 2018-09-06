import * as R from 'ramda'
import { createSelector } from 'reselect'
import { REDUCER_KEY } from './reducer'
import { STEPS } from './constants'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const currentStepSelector = get('currentStep')
export const canGoBackSelector = createSelector(
  currentStepSelector,
  R.pipe(
    R.indexOf(R.__, STEPS),
    R.gt(R.__, 0)
  )
)

export const selectedBankIdSelector = get('bank', 'selectedBank', 'id')
export const selectedBankNameSelector = get('bank', 'selectedBank', 'name')
export const selectedBankLogoSelector = get('bank', 'selectedBank', 'logoUrl')
