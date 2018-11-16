import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose, branch, renderComponent, withStateHandlers } from 'recompose'
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
import AcceptExternalAPIUsage from './AcceptExternalAPIUsage'

const styles = {
  root: {},
}

const Credentials = ({ className, classes, fields, isChecking }) => (
  <StepLayout
    className={cx(classes.root, className)}
    footerText={
      isChecking
        ? 'Verifying credentials... It’s can take up to 60 seconds.'
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
  withStateHandlers(
    {},
    { onAccept: () => () => ({ externalAPIUsageAccepted: true }) }
  ),
  branch(
    props => !props.externalAPIUsageAccepted,
    renderComponent(AcceptExternalAPIUsage)
  ),
  branch(R.prop('isError'), renderComponent(CredentialsFail)),
  injectStyles(styles)
)(Credentials)