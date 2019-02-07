import * as R from 'ramda'
import { compose, branch, renderComponent, withProps } from 'recompose'
import reconnect from 'utils/reconnect'
import Credentials from 'components/onboarding/Steps/Credentials'
import CredentialsFail from 'containers/admin/Onboarding/Steps/CredentialsFail'
import * as ACTIONS from '../actions'
import { STEP_FORM } from '../constants'
import {
  credentialsFieldsSelector,
  isCredentialsCheckingSelector,
  isCredentialsErrorSelector,
  isLoadingNextOrPollingSelector,
  isMfaStepSelector,
  selectedBankLogoSelector,
  selectedBankNameSelector,
} from '../selectors'

export default compose(
  withProps({ formName: STEP_FORM }),
  reconnect(
    {
      fields: credentialsFieldsSelector,
      isChecking: isCredentialsCheckingSelector,
      formDisabled: isLoadingNextOrPollingSelector,
      isError: isCredentialsErrorSelector,
      isMfa: isMfaStepSelector,
      bankName: selectedBankNameSelector,
      bankLogoUrl: selectedBankLogoSelector,
    },
    { onFormSubmit: ACTIONS.goNext }
  ),
  branch(R.prop('isError'), renderComponent(CredentialsFail))
)(Credentials)
