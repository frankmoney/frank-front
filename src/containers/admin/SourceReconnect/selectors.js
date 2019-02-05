// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { isValid, getFormValues } from 'redux-form/immutable'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'
import { STEP_FORM, SOURCE_STATUS } from './constants'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const loading = get('loading')
export const loaded = get('loaded')
export const loadingNext = get('loadingNext')
export const loadingBack = get('loadingBack')
export const sourceStatus = get('source', 'status')
export const sourceId = get('source', 'id')
export const accountId = get('source', 'accountId')
export const bankLogoUrl = get('source', 'bankLogo')
export const bankName = get('source', 'bankName')
export const credentialFields = createPlainObjectSelector(
  get('source', 'credentials')
)
export const mfaFields = createPlainObjectSelector(get('source', 'challenges'))
export const isChecking = createSelector(
  sourceStatus,
  R.equals(SOURCE_STATUS.checking)
)
export const isMFA = createSelector(
  sourceStatus,
  R.equals(SOURCE_STATUS.needMFA)
)
export const isCredentials = createSelector(
  sourceStatus,
  R.equals(SOURCE_STATUS.needCredentials)
)
export const isError = createSelector(sourceStatus, x =>
  [SOURCE_STATUS.locked, SOURCE_STATUS.failed].includes(x)
)
export const isSuccess = createSelector(
  sourceStatus,
  R.equals(SOURCE_STATUS.normal)
)

export const isFormValid = isValid(STEP_FORM)
const serializeFormValues = R.pipe(
  R.toPairs,
  R.map(([guid, value]) => ({
    guid,
    value,
  }))
)

export const serializedFormValues = createSelector(
  createPlainObjectSelector(getFormValues(STEP_FORM)),
  serializeFormValues
)
