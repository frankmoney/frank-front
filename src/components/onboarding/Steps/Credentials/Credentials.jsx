import React from 'react'
import StepLayout from 'components/onboarding/StepLayout'
import StepTitle from 'components/onboarding/StepTitle'
import StepBankLogo from 'components/onboarding/StepBankLogo'
import StepForm from 'components/onboarding/StepForm'

const Credentials = ({
  className,
  layoutProps,
  formName,
  onFormSubmit,
  formDisabled,
  fields,
  isChecking,
  bankName,
  bankLogoUrl,
}) => (
  <StepLayout
    backLabel="Select another bank"
    {...layoutProps}
    className={className}
    footerText={
      isChecking
        ? 'Verifying credentials... It’s can take up to 60 seconds.'
        : 'We never store account credentials'
    }
  >
    <StepBankLogo bankName={bankName} bankLogoUrl={bankLogoUrl} />
    <StepTitle>Enter your credentials</StepTitle>
    <StepForm
      fields={fields}
      disabled={formDisabled}
      form={formName}
      onSumbit={onFormSubmit}
    />
  </StepLayout>
)

export default Credentials
