import { createRootEpic } from '@frankmoney/webapp'
import * as ledgerEpics from 'containers/Ledger/epics'
import * as storyPreviewEpics from 'containers/StoryPreview/epics'
import * as storyEditEpics from 'containers/StoryEdit/epics'
import * as teamEpics from 'containers/Team/epics'
import * as teamEditRoleDrawerEpics from 'containers/Team/EditRoleDrawer/epics'
import * as teamInviteDrawerEpics from 'containers/Team/InviteDrawer/epics'

export default createRootEpic([
  ledgerEpics,
  storyPreviewEpics,
  storyEditEpics,
  teamEpics,
  teamEditRoleDrawerEpics,
  teamInviteDrawerEpics,
])
