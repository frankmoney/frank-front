import storage from 'local-storage-fallback'
import { push as pushRoute } from 'react-router-redux'
import * as USER_ACTIONS from 'redux/actions/user'
import { LS_FLAGS, ROUTES } from 'const'
import * as ACTIONS from './actions'
import { CREDENTIALS_STATUS } from './constants'
import QUERIES from './queries'
import {
  accountInfoFormSelector,
  credentialsFormSelector,
  currentStepSelector,
  selectedAccountIdSelector,
  selectedBankIdSelector,
  categoriesSelector,
  teamMembersSelector,
  categoryTypeSelector,
} from './selectors'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => graphql(QUERIES.getOnboardingSession))
    .switchMap(async session => {
      if (session && session.step === 'team') {
        const team = await graphql(QUERIES.getTeam)
        return { ...session, team }
      }

      return session
    })
    .map(session =>
      ACTIONS.load.success({
        session,
      })
    )

export const loadBanksEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.loadBanks)
    .switchMap(({ payload: nameFilter = '' }) =>
      graphql(QUERIES.listBanks, { filter: nameFilter })
    )
    .map(ACTIONS.loadBanks.success)

export const resetBankSearchEpic = action$ =>
  action$.ofType(ACTIONS.banksResetSearch).map(() => ACTIONS.bankNameType(''))

export const searchBankEpic = action$ =>
  action$
    .ofType(ACTIONS.bankNameType)
    .debounceTime(300)
    .map(({ payload: filter }) => ACTIONS.loadBanks(filter))

export const nextStepEpic = (action$, store, { graphql }) =>
  action$.ofType(ACTIONS.goNext).mergeMapFromPromise(async () => {
    const state = store.getState()
    const step = currentStepSelector(state)
    if (step === 'bank') {
      const bankId = selectedBankIdSelector(state)
      const session = await graphql(QUERIES.selectBank, { id: bankId })
      return [ACTIONS.goNext.success(session)]
    } else if (step === 'credentials') {
      const credentials = credentialsFormSelector(state)
      const session = await graphql(QUERIES.sendCredentials, {
        credentials: Object.entries(credentials).map(([guid, value]) => ({
          guid,
          value,
        })),
      })
      return [ACTIONS.goNext.success(session)]
    } else if (step === 'mfa') {
      const formData = credentialsFormSelector(state)
      const session = await graphql(QUERIES.sendMfa, {
        challenges: Object.entries(formData).map(([guid, value]) => ({
          guid,
          value,
        })),
      })
      return [ACTIONS.goNext.success(session)]
    } else if (step === 'account') {
      const accountId = selectedAccountIdSelector(state)
      const session = await graphql(QUERIES.selectAccount, {
        id: accountId,
      })
      return [ACTIONS.goNext.success(session)]
    } else if (step === 'accountInfo') {
      const { name, description } = accountInfoFormSelector(state)
      await graphql(QUERIES.updateAccountInfo, {
        name,
        description,
      })
      const session = await graphql(QUERIES.completeAccountInfo)
      return [ACTIONS.goNext.success(session)]
    } else if (step === 'categories') {
      const categories = categoriesSelector(state)
      const categoryType = categoryTypeSelector(state)
      await graphql(
        categoryType === 'spending'
          ? QUERIES.updateSpendingCategories
          : QUERIES.updateRevenueCategories,
        {
          categories: categories.map(({ name, color }) => ({ name, color })),
        }
      )
      const session = await graphql(
        categoryType === 'spending'
          ? QUERIES.completeSpendingCategories
          : QUERIES.completeRevenueCategories
      )

      if (session.step === 'team') {
        const team = await graphql(QUERIES.getTeam)
        session.team = team
      }

      return [ACTIONS.goNext.success(session)]
    } else if (step === 'team') {
      const members = teamMembersSelector(state)
      await graphql(QUERIES.updateTeam, {
        members: members.map(({ email, note }) => ({
          email,
          note,
        })),
      })

      const account = await graphql(QUERIES.finish)

      return [
        USER_ACTIONS.addAccount(account),
        USER_ACTIONS.selectAccount(account.id),
        pushRoute(ROUTES.manage.ledger.root),
      ]
    }
  })

export const pollCredentialsWhileStatusIsCheckingEpic = (
  action$,
  store,
  { graphql }
) =>
  action$
    .ofType(ACTIONS.goNext.success, ACTIONS.load.success)
    // skip empty onboarding
    .filter(({ payload }) => !!payload)
    .filter(
      ({ payload: { step, credentials, mfa } }) =>
        (step === 'credentials' &&
          credentials.status === CREDENTIALS_STATUS.checking) ||
        (step === 'mfa' && mfa.status === CREDENTIALS_STATUS.checking)
    )
    .debounceTime(2000)
    .switchMap(() => graphql(QUERIES.getOnboardingSession))
    .map(ACTIONS.goNext.success)

export const prevStepEpic = (action$, store, { graphql }) =>
  action$.ofType(ACTIONS.goBack).switchMap(() => {
    const state = store.getState()
    const step = currentStepSelector(state)
    if (step === 'credentials') {
      return Promise.resolve(ACTIONS.cancel())
    }
    return graphql(QUERIES.goBack).then(ACTIONS.goBack.success)
  })

export const cancelEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.cancel)
    .switchMap(() => graphql(QUERIES.cancel))
    .map(ACTIONS.load)
