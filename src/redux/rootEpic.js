import { createRootEpic } from '@frankmoney/webapp'
import * as userEpics from 'redux/epics/user'
import * as onboardingEpics from 'containers/admin/Onboarding/epics'
import * as adminLedgerEpics from 'containers/admin/Ledger/epics'
import * as publicLedgerEpics from 'containers/public/Ledger/epics'
import * as directoryEpics from 'containers/admin/Directory/epics'
import * as recipientEpics from 'containers/admin/Recipient/epics'
import * as storiesEpics from 'containers/admin/Stories/epics'
import * as storyPreviewEpics from 'containers/admin/StoryPreview/epics'
import * as storyEditEpics from 'containers/admin/StoryEdit/epics'
import * as teamEpics from 'containers/admin/Team/epics'

export default createRootEpic([
  userEpics,
  onboardingEpics,
  adminLedgerEpics,
  publicLedgerEpics,
  directoryEpics,
  recipientEpics,
  storiesEpics,
  storyPreviewEpics,
  storyEditEpics,
  teamEpics,
])
