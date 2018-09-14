import * as ACTIONS from './actions'
import QUERIES from './queries'
import { currentStepSelector, selectedBankIdSelector } from './selectors'

export const loadEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.load)
    .switchMap(() => graphql(QUERIES.getOnboardingSession))
    .map(ACTIONS.load.success)

export const loadBanksEpic = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.loadBanks)
    .switchMap(({ payload: nameFilter = '' }) =>
      graphql(QUERIES.listBanks, { filter: nameFilter })
    )
    .map(ACTIONS.loadBanks.success)

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
    } else if (step == 'credentials') {
      const session = await graphql(QUERIES.sendCredentials, {
        credentials: [
          {
            guid: 'CRD-598ec8d4-6200-8cda-345d-3dbb5fc17716',
            value: 'username',
          },
          {
            guid: 'CRD-27d0edb8-1d50-5b90-bcbc-be270ca42b9f',
            value: 'password',
          },
        ].map(x => JSON.stringify(x)),
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
