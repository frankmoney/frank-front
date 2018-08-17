import * as R from 'ramda'
import { createSelector } from 'reselect'
import { currentUserSelector } from '@frankmoney/webapp'

export const currentAccountIdSelector = createSelector(
  currentUserSelector,
  R.prop('accountId')
)
