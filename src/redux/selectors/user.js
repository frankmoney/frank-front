import * as R from 'ramda'
import { createSelector } from 'reselect'
import { currentUserSelector, pathnameSelector } from '@frankmoney/webapp'
import { matchPath } from 'react-router'
import { ROUTES } from 'const'

export const currentAccountIdSelector = createSelector(
  pathnameSelector,
  path => {
    const match = matchPath(path, { path: ROUTES.account.idRoot })
    return match && match.params.accountId
  }
)

export const userAccountsSelector = createSelector(
  currentUserSelector,
  R.prop('accounts')
)
