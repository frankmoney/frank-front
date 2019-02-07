import * as R from 'ramda'
import { branch, compose, renderComponent, withProps } from 'recompose'
import CredentialsFail from 'containers/admin/Onboarding/Steps/CredentialsFail'
import VerifyIdentity from 'components/onboarding/Steps/VerifyIdentity'
import reconnect from 'utils/reconnect'
import * as ACTIONS from '../actions'
import { STEP_FORM } from '../constants'
import {
  credentialsFieldsSelector,
  isCredentialsCheckingSelector,
  isCredentialsErrorSelector,
  selectedBankLogoSelector,
  selectedBankNameSelector,
} from '../selectors'

export default compose(
  withProps({ formName: STEP_FORM }),
  reconnect(
    {
      fields: credentialsFieldsSelector,
      isChecking: isCredentialsCheckingSelector,
      isError: isCredentialsErrorSelector,
      bankName: selectedBankNameSelector,
      bankLogoUrl: selectedBankLogoSelector,
    },
    { onFormSubmit: ACTIONS.goNext }
  ),
  branch(R.prop('isError'), renderComponent(CredentialsFail))
)(VerifyIdentity)
