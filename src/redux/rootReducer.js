import { createReducer } from '@frankmoney/webapp'
import ledgerReducer, { REDUCER_KEY as ledgerKey } from 'containers/Ledger/reducer'
import teamReducer, { name as teamKey } from 'containers/Team/reducer'
import teamEditRoleDrawerReducer, {
  name as teamEditRoleDrawerKey,
} from 'containers/Team/EditRoleDrawer/reducer'
import teamInviteDrawerReducer, {
  name as teamInviteDrawerKey,
} from 'containers/Team/InviteDrawer/reducer'

export default createReducer({
  [ledgerKey]: ledgerReducer,
  [teamKey]: teamReducer,
  [teamEditRoleDrawerKey]: teamEditRoleDrawerReducer,
  [teamInviteDrawerKey]: teamInviteDrawerReducer,
})
