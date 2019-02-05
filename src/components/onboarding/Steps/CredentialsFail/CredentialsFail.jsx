import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import {
  AccountBalance as BankIcon,
  AccountCircle as UserIcon,
  Cancel as CancelIcon,
} from 'material-ui-icons'
import StepLayout from 'components/onboarding/StepLayout'
import StepTitle from 'components/onboarding/StepTitle'
import StepDescription from 'components/onboarding/StepDescription'
import StepBankLogo from 'components/onboarding/StepBankLogo'
import OptionsList, { OptionsListItem } from 'components/onboarding/OptionsList'

const styles = {
  root: {},
  options: {
    marginTop: 40,
  },
}

const CredentialsFail = ({
  className,
  classes,
  layoutProps,
  onBackToLogin,
  onCancelOnboarding,
  bankUrl,
  bankName,
  bankLogoUrl,
}) => (
  <StepLayout
    {...layoutProps}
    className={cx(classes.root, className)}
    noFooter
    backLabel="Cancel connecting to the account"
  >
    <StepBankLogo bankName={bankName} bankLogoUrl={bankLogoUrl} />
    <StepTitle>Connection failed</StepTitle>
    <StepDescription>
      There was a problem validating your credentials. Please try again later.
    </StepDescription>
    <OptionsList className={classes.options}>
      <OptionsListItem
        primaryText="Go to Bank’s website"
        primaryTextIcon={<BankIcon />}
        href={bankUrl}
        externalLink
        target="_blank"
      />
      <OptionsListItem
        primaryText="Enter new login information"
        primaryTextIcon={<UserIcon />}
        onClick={onBackToLogin}
      />
      <OptionsListItem
        primaryText="Cancel connecting"
        primaryTextIcon={<CancelIcon />}
        onClick={onCancelOnboarding}
      />
    </OptionsList>
  </StepLayout>
)

export default injectStyles(styles)(CredentialsFail)
