import { createPlainObjectSelector } from '@frankmoney/utils'
import { currentUserSelector } from '@frankmoney/webapp'
import * as R from 'ramda'
import { createSelector } from 'reselect'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const loadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const tokenSelector = get('token')

export const inviteSelector = createPlainObjectSelector(get('invite'))

export const createUserFormInitialValuesSelector = createSelector(
  inviteSelector,
  invite => ({
    teamName: invite.team.name,
    email: invite.email,
  })
)

export const currentUserPidSelector = createSelector(
  currentUserSelector,
  R.prop('id')
)
