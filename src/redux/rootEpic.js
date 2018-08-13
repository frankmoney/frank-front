import { createRootEpic } from '@frankmoney/webapp'
import * as ledgerEpics from 'containers/Ledger/epics'
import * as teamEpics from 'containers/Team/epics'
import * as teamEditRoleDrawerEpics from 'containers/Team/EditRoleDrawer/epics'
import * as teamInviteDrawerEpics from 'containers/Team/InviteDrawer/epics'

export default createRootEpic([
  ledgerEpics,
  teamEpics,
  teamEditRoleDrawerEpics,
  teamInviteDrawerEpics,
])
