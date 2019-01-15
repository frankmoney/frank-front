import { querySelector } from '@frankmoney/webapp'
import * as R from 'ramda'
import { createSelector } from 'reselect'

export const returnUrlSelector = createSelector(querySelector, R.prop('r'))

export const initialValuesSelector = createSelector(
  createSelector(querySelector, R.prop('e')),
  email => ({ email })
)
