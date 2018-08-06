import { createReducer } from '@frankmoney/webapp'
import ledgerReducer, {
  REDUCER_KEY as ledgerKey,
} from 'containers/Ledger/reducer'
import ledgerChartsReducer, {
  name as ledgerChartsKey,
} from 'containers/Ledger/GraphOverviewCard/reducer'
import teamReducer, { name as teamKey } from 'containers/Team/reducer'
import teamEditRoleDrawerReducer, {
  name as teamEditRoleDrawerKey,
} from 'containers/Team/EditRoleDrawer/reducer'
import teamInviteDrawerReducer, {
  name as teamInviteDrawerKey,
} from 'containers/Team/InviteDrawer/reducer'

export default createReducer({
  [ledgerChartsKey]: ledgerChartsReducer,
  [ledgerKey]: ledgerReducer,
  [teamEditRoleDrawerKey]: teamEditRoleDrawerReducer,
  [teamInviteDrawerKey]: teamInviteDrawerReducer,
  [teamKey]: teamReducer,
})
