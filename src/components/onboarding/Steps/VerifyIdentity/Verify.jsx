import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import StepLayout from 'components/onboarding/StepLayout'
import StepTitle from 'components/onboarding/StepTitle'
import StepForm from 'components/onboarding/StepForm'
import StepBankLogo from 'components/onboarding/StepBankLogo'

const styles = {
  root: {},
  answers: {
    marginTop: 50,
  },
}

const Verify = ({
  className,
  classes,
  layoutProps,
  formName,
  onFormSubmit,
  fields,
  isChecking,
  bankName,
  bankLogoUrl,
}) => (
  <StepLayout {...layoutProps} className={cx(classes.root, className)}>
    <StepBankLogo bankName={bankName} bankLogoUrl={bankLogoUrl} />
    <StepTitle>Verify your identity</StepTitle>
    <StepForm
      fields={fields}
      isChecking={isChecking}
      form={formName}
      onSubmit={onFormSubmit}
    />
  </StepLayout>
)

export default injectStyles(styles)(Verify)
