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
import adminStoryReducer, {
  REDUCER_KEY as adminStoryKey,
} from 'containers/admin/Story/reducer'
import publicStoryReducer, {
  REDUCER_KEY as publicStoryKey,
} from 'containers/public/Story/reducer'
import storyEditReducer, {
  REDUCER_KEY as storyEditKey,
} from 'containers/admin/StoryEdit/reducer'
import publicPaymentReducer, {
  REDUCER_KEY as publicPaymentKey,
} from 'containers/public/Payment/reducer'
import teamReducer, { name as teamKey } from 'containers/admin/Team/reducer'
import onboardingReducer, {
  REDUCER_KEY as onboardingKey,
} from 'containers/admin/Onboarding/reducer'
import filtersReducer, {
  REDUCER_KEY as filtersKey,
} from 'containers/admin/Filters/reducer'
import paymentsSelectReducer, {
  REDUCER_KEY as paymentsSelectKey,
} from 'containers/admin/PaymentsSelect/reducer'
import inboxReducer, {
  REDUCER_KEY as inboxKey,
} from 'containers/admin/Inbox/reducer'
import settingsReducer, {
  REDUCER_KEY as settingsKey,
} from 'containers/admin/Settings/reducer'
import paymentReducer, {
  REDUCER_KEY as paymentKey,
} from 'containers/admin/PaymentCard/reducer'

export default createReducer({
  [adminLedgerKey]: adminLedgerReducer,
  [publicLedgerKey]: publicLedgerReducer,
  [directoryKey]: directoryReducer,
  [recipientKey]: recipientReducer,
  [storiesKey]: storiesReducer,
  [adminStoryKey]: adminStoryReducer,
  [publicStoryKey]: publicStoryReducer,
  [storyEditKey]: storyEditReducer,
  [publicPaymentKey]: publicPaymentReducer,
  [teamKey]: teamReducer,
  [widgetDataKey]: widgetDataReducer,
  [onboardingKey]: onboardingReducer,
  [filtersKey]: filtersReducer,
  [inboxKey]: inboxReducer,
  [paymentsSelectKey]: paymentsSelectReducer,
  [settingsKey]: settingsReducer,
  [paymentKey]: paymentReducer,
})
