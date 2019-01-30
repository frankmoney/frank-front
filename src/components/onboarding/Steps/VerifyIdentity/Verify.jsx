import * as R from 'ramda'
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { branch, compose, renderComponent } from 'recompose'
import StepLayout from 'containers/admin/Onboarding/StepLayout'
import CredentialsFail from 'containers/admin/Onboarding/Steps/Credentials/CredentialsFail'
import reconnect from 'utils/reconnect'
import StepTitle from 'components/onboarding/StepTitle'
import StepForm from 'components/onboarding/StepForm'
import StepBankLogo from 'components/onboarding/StepBankLogo'
import {
  credentialsFieldsSelector,
  isCredentialsCheckingSelector,
  isCredentialsErrorSelector,
} from '../../selectors'

const styles = {
  root: {},
  answers: {
    marginTop: 50,
  },
}

const Verify = ({ className, classes, fields, isChecking }) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepBankLogo />
    <StepTitle>Verify your identity</StepTitle>
    <StepForm fields={fields} isChecking={isChecking} />
  </StepLayout>
)

export default compose(
  reconnect({
    fields: credentialsFieldsSelector,
    isChecking: isCredentialsCheckingSelector,
    isError: isCredentialsErrorSelector,
  }),
  branch(R.prop('isError'), renderComponent(CredentialsFail)),
  injectStyles(styles)
)(Verify)
