import { createReducer } from '@frankmoney/webapp'
import widgetDataReducer, {
  REDUCER_KEY as widgetDataKey,
} from 'containers/Widget/reducer'
import ledgerReducer, {
  REDUCER_KEY as ledgerKey,
} from 'containers/Ledger/reducer'
import directoryReducer, {
  REDUCER_KEY as directoryKey,
} from 'containers/Directory/reducer'
import recipientReducer, {
  REDUCER_KEY as recipientKey,
} from 'containers/Recipient/reducer'
import teamReducer, { name as teamKey } from 'containers/Team/reducer'
import onboardingReducer, {
  REDUCER_KEY as onboardingKey,
} from 'containers/Onboarding/reducer'

export default createReducer({
  [ledgerKey]: ledgerReducer,
  [directoryKey]: directoryReducer,
  [recipientKey]: recipientReducer,
  [teamKey]: teamReducer,
  [teamKey]: teamReducer,
  [widgetDataKey]: widgetDataReducer,
  [onboardingKey]: onboardingReducer,
})
