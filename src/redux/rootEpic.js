import { createRootEpic } from '@frankmoney/webapp'
import * as onboardingEpics from 'containers/Onboarding/epics'
import * as ledgerEpics from 'containers/Ledger/epics'
import * as directoryEpics from 'containers/Directory/epics'
import * as recipientEpics from 'containers/Recipient/epics'
import * as teamEpics from 'containers/Team/epics'
import * as teamEditRoleDrawerEpics from 'containers/Team/EditRoleDrawer/epics'
import * as teamInviteDrawerEpics from 'containers/Team/InviteDrawer/epics'

export default createRootEpic([
  onboardingEpics,
  ledgerEpics,
  directoryEpics,
  recipientEpics,
  teamEpics,
  teamEditRoleDrawerEpics,
  teamInviteDrawerEpics,
])
