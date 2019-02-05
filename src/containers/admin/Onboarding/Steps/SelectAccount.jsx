import reconnect from 'utils/reconnect'
import SelectAccount from 'components/onboarding/Steps/SelectAccount'
import {
  accountsSelector,
  selectedAccountIdSelector,
  selectedBankLogoSelector,
  selectedBankNameSelector,
} from '../selectors'
import * as ACTIONS from '../actions'

export default reconnect(
  {
    accounts: accountsSelector,
    selectedAccountId: selectedAccountIdSelector,
    bankName: selectedBankNameSelector,
    bankLogoUrl: selectedBankLogoSelector,
  },
  {
    onAccountSelect: ACTIONS.accountSelect,
  }
)(SelectAccount)
