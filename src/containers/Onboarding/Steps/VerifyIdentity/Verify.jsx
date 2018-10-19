import * as R from 'ramda'
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { branch, compose, renderComponent } from 'recompose'
import reconnect from 'utils/reconnect'
import {
  credentialsFieldsSelector,
  isCredentialsCheckingSelector,
  isCredentialsErrorSelector,
} from '../../selectors'
import StepLayout from '../../ConnectedStepLayout'
import StepTitle from '../../StepTitle'
import StepForm from '../../StepForm'
import StepBankLogo from '../../StepBankLogo'
import CredentialsFail from '../Credentials/CredentialsFail'

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
