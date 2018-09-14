import * as ACTIONS from './actions'
import QUERIES from './queries'
import {
  credentialsFormSelector,
  currentStepSelector,
  selectedAccountIdSelector,
  selectedBankIdSelector,
} from './selectors'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => graphql(QUERIES.getOnboardingSession))
    // .map(() => ({ credentials: { status: 'success' } }))
    .map(ACTIONS.load.success)

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
  action$.ofType(ACTIONS.goNext).switchMapFromPromise(async () => {
    const state = store.getState()
    const step = currentStepSelector(state)
    if (step === 'bank') {
      const bankId = selectedBankIdSelector(state)
      const session = await graphql(QUERIES.selectBank, { id: bankId })
      return ACTIONS.goNext.success(session)
    } else if (step === 'credentials') {
      const credentials = credentialsFormSelector(state)
      const session = await graphql(QUERIES.sendCredentials, {
        credentials: Object.entries(credentials).map(([guid, value]) =>
          JSON.stringify({ guid, value })
        ),
      })
      return ACTIONS.goNext.success(session)
    } else if (step === 'account') {
      const accountId = selectedAccountIdSelector(state)
      const session = await graphql(QUERIES.selectAccount, {
        id: accountId,
      })
      return ACTIONS.goNext.success(session)
    }
  })

export const prevStepEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.goBack)
    .switchMap(() => graphql(QUERIES.goBack))
    .switchMap(() => graphql(QUERIES.getOnboardingSession))
    .map(ACTIONS.goBack.success)
