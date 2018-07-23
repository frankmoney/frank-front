import { createReducer } from '@frankmoney/webapp'
import teamReducer, { name as teamKey } from 'containers/Team/reducer'
import teamEditRoleDrawerReducer, {
  name as teamEditRoleDrawerKey,
} from 'containers/Team/EditRoleDrawer/reducer'
import teamInviteDrawerReducer, {
  name as teamInviteDrawerKey,
} from 'containers/Team/InviteDrawer/reducer'

export default createReducer({
  [teamKey]: teamReducer,
  [teamEditRoleDrawerKey]: teamEditRoleDrawerReducer,
  [teamInviteDrawerKey]: teamInviteDrawerReducer,
})
