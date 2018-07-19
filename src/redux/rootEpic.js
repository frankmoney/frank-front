import { createRootEpic } from '@frankmoney/webapp'
import * as teamEpics from 'containers/Team/epics'
import * as teamEditRoleDrawerEpics from 'containers/Team/EditRoleDrawer/epics'
import * as teamInviteDrawerEpics from 'containers/Team/InviteDrawer/epics'

export default createRootEpic([
  teamEpics,
  teamEditRoleDrawerEpics,
  teamInviteDrawerEpics,
])
