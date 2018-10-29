import { createReducer } from '@frankmoney/webapp'
import widgetDataReducer, {
  REDUCER_KEY as widgetDataKey,
} from 'containers/Widget/reducer'
import adminLedgerReducer, {
  REDUCER_KEY as adminLedgerKey,
} from 'containers/admin/Ledger/reducer'
import publicLedgerReducer, {
  REDUCER_KEY as publicLedgerKey,
} from 'containers/public/Ledger/reducer'
import directoryReducer, {
  REDUCER_KEY as directoryKey,
} from 'containers/admin/Directory/reducer'
import recipientReducer, {
  REDUCER_KEY as recipientKey,
} from 'containers/admin/Recipient/reducer'
import storiesReducer, {
  REDUCER_KEY as storiesKey,
} from 'containers/admin/Stories/reducer'
import storyPreviewReducer, {
  REDUCER_KEY as storyPreviewKey,
} from 'containers/admin/StoryPreview/reducer'
import storyEditReducer, {
  REDUCER_KEY as storyEditKey,
} from 'containers/admin/StoryEdit/reducer'
import teamReducer, { name as teamKey } from 'containers/admin/Team/reducer'
import onboardingReducer, {
  REDUCER_KEY as onboardingKey,
} from 'containers/admin/Onboarding/reducer'

export default createReducer({
  [adminLedgerKey]: adminLedgerReducer,
  [publicLedgerKey]: publicLedgerReducer,
  [directoryKey]: directoryReducer,
  [recipientKey]: recipientReducer,
  [storiesKey]: storiesReducer,
  [storyPreviewKey]: storyPreviewReducer,
  [storyEditKey]: storyEditReducer,
  [teamKey]: teamReducer,
  [teamKey]: teamReducer,
  [widgetDataKey]: widgetDataReducer,
  [onboardingKey]: onboardingReducer,
})
