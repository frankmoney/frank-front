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
} from '../../selectors'
import StepLayout from '../../ConnectedStepLayout'
import StepTitle from '../../StepTitle'
import StepBankLogo from '../../StepBankLogo'
import StepForm from '../../StepForm'
import CredentialsFail from './CredentialsFail'

const styles = {
  root: {},
}

const Credentials = ({ className, classes, fields, isChecking }) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerText={
      isChecking
        ? 'Verifying credentials... It’s can last from 5 to 60 seconds.'
        : 'We never store account credentials'
    }
    backButtonText="Select another bank"
  >
    <StepBankLogo />
    <StepTitle>Enter your credentials</StepTitle>
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
)(Credentials)
