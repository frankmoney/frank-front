import React from 'react'
import StepLayout from 'components/onboarding/StepLayout'
import StepTitle from 'components/onboarding/StepTitle'
import StepDescription from 'components/onboarding/StepDescription'
import imageUrl from './caughtUp.png'

const AccountLinked = ({ layoutProps }) => (
  <StepLayout centered canGoNext {...layoutProps}>
    <img src={imageUrl} width={273} alt="account is linked" />
    <StepTitle>Ready. Set. Go!</StepTitle>
    <StepDescription>Your account is now linked to Frank</StepDescription>
  </StepLayout>
)

export default AccountLinked
