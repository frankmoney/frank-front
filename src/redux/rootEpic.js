import { createRootEpic } from '@frankmoney/webapp'
import * as userEpics from 'redux/epics/user'
import * as onboardingEpics from 'containers/admin/Onboarding/epics'
import * as adminLedgerEpics from 'containers/admin/Ledger/epics'
import * as publicLedgerEpics from 'containers/public/Ledger/epics'
import * as directoryEpics from 'containers/admin/Directory/epics'
import * as recipientEpics from 'containers/admin/Recipient/epics'
import * as storiesEpics from 'containers/admin/Stories/epics'
import * as adminStoryEpics from 'containers/admin/Story/epics'
import * as publicStoryEpics from 'containers/public/Story/epics'
import * as storyEditEpics from 'containers/admin/StoryEdit/epics'
import * as publicPaymentEpics from 'containers/public/Payment/epics'
import * as teamEpics from 'containers/admin/Team/epics'
import * as filtersEpics from 'containers/admin/Filters/epics'
import * as paymentsSelectEpics from 'containers/admin/PaymentsSelect/epics'
import * as inboxEpics from 'containers/admin/Inbox/epics'
import * as settingsEpics from 'containers/admin/Settings/epics'
import * as paymentEpics from 'containers/admin/PaymentCard/epics'
import * as authSignInEpics from 'containers/auth/SignIn/epics'
import * as authSignUpEpics from 'containers/auth/SignUp/epics'
import * as authAcceptInvitationEpics from 'containers/auth/AcceptInvitation/epics'
import * as authRecoverPasswordEpics from 'containers/auth/RecoverPassword/epics'
import * as authResetPasswordEpics from 'containers/auth/ResetPassword/epics'
import * as multiEditEpics from 'containers/admin/MultiEditSnack/epics'

export default createRootEpic([
  userEpics,
  onboardingEpics,
  adminLedgerEpics,
  publicLedgerEpics,
  directoryEpics,
  recipientEpics,
  storiesEpics,
  adminStoryEpics,
  publicStoryEpics,
  storyEditEpics,
  publicPaymentEpics,
  teamEpics,
  filtersEpics,
  paymentsSelectEpics,
  inboxEpics,
  settingsEpics,
  paymentEpics,
  authSignInEpics,
  authSignUpEpics,
  authAcceptInvitationEpics,
  authRecoverPasswordEpics,
  authResetPasswordEpics,
  multiEditEpics,
])
