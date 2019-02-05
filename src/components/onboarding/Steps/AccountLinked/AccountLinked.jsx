import React from 'react'
import StepLayout from 'components/onboarding/StepLayout'
import StepTitle from 'components/onboarding/StepTitle'
import StepDescription from 'components/onboarding/StepDescription'

const AccountLinked = ({ layoutProps }) => (
  <StepLayout {...layoutProps}>
    <StepTitle>Ready. Set. Go!</StepTitle>
    <StepDescription>Your account is now linked to Frank</StepDescription>
  </StepLayout>
)

export default AccountLinked
