import reconnect from 'utils/reconnect'
import StepBankLogo from 'components/onboarding/StepBankLogo'
import { selectedBankLogoSelector, selectedBankNameSelector } from './selectors'

export default reconnect({
  bankName: selectedBankNameSelector,
  bankLogoUrl: selectedBankLogoSelector,
})(StepBankLogo)
