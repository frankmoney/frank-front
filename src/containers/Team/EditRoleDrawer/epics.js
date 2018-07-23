import { push } from 'react-router-redux'
import { ROUTES } from 'const'
import { PROFILES } from '../constants'
import ACTIONS from './actions'
import {
  idSelector,
  adminSelector,
  canInviteSelector,
  accessSelector,
} from './selectors'

export const cancelEpic = action$ =>
  action$.ofType(ACTIONS.cancel).map(() => push(ROUTES.team.root))

export const submitEpic = (action$, store) =>
  action$.ofType(ACTIONS.submit).switchMap(() => {
    const state = store.getState()

    const id = idSelector(state)
    const admin = adminSelector(state)
    const canInvite = canInviteSelector(state)
    const access = accessSelector(state)

    PROFILES[id] = {
      ...PROFILES[id],
      admin,
      canInvite,
      access,
    }

    return [ACTIONS.submit.success(), push(ROUTES.team.root)]
  })
