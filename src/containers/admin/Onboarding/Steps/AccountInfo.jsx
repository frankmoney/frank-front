import { withProps, compose } from 'recompose'
import AccountInfo from 'components/onboarding/Steps/AccountInfo'
import reconnect from 'utils/reconnect'
import {
  accountInfoInitialValuesSelector,
  sessionBankNameSelector,
  sessionBankImageSelector,
} from '../selectors'
import { ACCOUNT_FORM } from '../constants'

export default compose(
  withProps({ form: ACCOUNT_FORM }),
  reconnect({
    initialValues: accountInfoInitialValuesSelector,
    bankName: sessionBankNameSelector,
    bankImageUrl: sessionBankImageSelector,
  })
)(AccountInfo)
