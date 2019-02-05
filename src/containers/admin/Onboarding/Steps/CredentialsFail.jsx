import reconnect from 'utils/reconnect'
import CredentialsFail from 'components/onboarding/Steps/CredentialsFail'
import {
  selectedBankLogoSelector,
  selectedBankNameSelector,
  selectedBankWebsiteSelector,
} from '../selectors'
import * as ACTIONS from '../actions'

export default reconnect(
  {
    bankUrl: selectedBankWebsiteSelector,
    bankName: selectedBankNameSelector,
    bankLogoUrl: selectedBankLogoSelector,
  },
  {
    onBackToLogin: ACTIONS.backToCredentials,
    onCancelOnboarding: ACTIONS.cancel,
  }
)(CredentialsFail)
