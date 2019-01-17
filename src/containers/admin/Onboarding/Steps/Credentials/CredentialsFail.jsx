import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose } from 'recompose'
import {
  AccountBalance as BankIcon,
  AccountCircle as UserIcon,
  Cancel as CancelIcon,
} from 'material-ui-icons'
import reconnect from 'utils/reconnect'
import { selectedBankWebsiteSelector } from '../../selectors'
import StepLayout from '../../ConnectedStepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import StepBankLogo from '../../StepBankLogo'
import OptionsList, { OptionsListItem } from '../../OptionsList'
import * as ACTIONS from '../../actions'

const styles = {
  root: {},
  options: {
    marginTop: 40,
  },
}

const CredentialsFail = ({
  className,
  classes,
  onBackToLogin,
  onCancelOnboarding,
  bankUrl,
}) => (
  <StepLayout
    className={cx(classes.root, className)}
    noFooter
    backLabel="Cancel connecting to the account"
  >
    <StepBankLogo />
    <StepTitle>Connection failed</StepTitle>
    <StepDescription>
      There was a problem validating your credentials. Please try again later.
    </StepDescription>
    <OptionsList className={classes.options}>
      <OptionsListItem
        primaryText="Go to Bank’s website"
        primaryTextIcon={<BankIcon />}
        component="a"
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

export default compose(
  reconnect(
    {
      bankUrl: selectedBankWebsiteSelector,
    },
    {
      onBackToLogin: ACTIONS.backToCredentials,
      onCancelOnboarding: ACTIONS.cancel,
    }
  ),
  injectStyles(styles)
)(CredentialsFail)
