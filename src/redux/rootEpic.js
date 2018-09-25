import { createRootEpic } from '@frankmoney/webapp'
import * as userEpics from 'redux/epics/user'
import * as onboardingEpics from 'containers/Onboarding/epics'
import * as ledgerEpics from 'containers/Ledger/epics'
import * as directoryEpics from 'containers/Directory/epics'
import * as recipientEpics from 'containers/Recipient/epics'
import * as storiesEpics from 'containers/Stories/epics'
import * as storyPreviewEpics from 'containers/StoryPreview/epics'
import * as storyEditEpics from 'containers/StoryEdit/epics'
import * as teamEpics from 'containers/Team/epics'

export default createRootEpic([
  userEpics,
  onboardingEpics,
  ledgerEpics,
  directoryEpics,
  recipientEpics,
  storiesEpics,
  storyPreviewEpics,
  storyEditEpics,
  teamEpics,
])
