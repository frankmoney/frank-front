import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose, branch, renderComponent } from 'recompose'
import reconnect from 'utils/reconnect'
import {
  credentialsFieldsSelector,
  isCredentialsCheckingSelector,
  isCredentialsErrorSelector,
  isLoadingNextOrPollingSelector,
  isMfaStepSelector,
} from '../../selectors'
import StepLayout from '../../ConnectedStepLayout'
import StepTitle from '../../StepTitle'
import StepBankLogo from '../../StepBankLogo'
import StepForm from '../../StepForm'
import CredentialsFail from './CredentialsFail'

const styles = {
  root: {},
}

const Credentials = ({
  className,
  classes,
  fields,
  isMfa,
  isChecking,
  formDisabled,
}) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerText={
      isChecking
        ? 'Verifying credentials... It’s can take up to 60 seconds.'
        : 'We never store account credentials'
    }
    backLabel={isMfa ? 'Enter new credentials' : 'Select another bank'}
  >
    <StepBankLogo />
    <StepTitle>Enter your credentials</StepTitle>
    <StepForm fields={fields} disabled={formDisabled} />
  </StepLayout>
)

export default compose(
  reconnect({
    fields: credentialsFieldsSelector,
    isChecking: isCredentialsCheckingSelector,
    formDisabled: isLoadingNextOrPollingSelector,
    isError: isCredentialsErrorSelector,
    isMfa: isMfaStepSelector,
  }),
  branch(R.prop('isError'), renderComponent(CredentialsFail)),
  injectStyles(styles)
)(Credentials)
