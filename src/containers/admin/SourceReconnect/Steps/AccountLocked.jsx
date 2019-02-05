import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { Link } from 'react-dom'
import { AccountBalance as BankIcon } from 'material-ui-icons'
import { createRouteUrl } from '@frankmoney/utils'
import reconnect from 'utils/reconnect'
import StepLayout from 'components/onboarding/StepLayout'
import StepTitle from 'components/onboarding/StepTitle'
import StepDescription from 'components/onboarding/StepDescription'
import StepBankLogo from 'components/onboarding/StepBankLogo'
import OptionsList, { OptionsListItem } from 'components/onboarding/OptionsList'
import { ROUTES } from 'const'
import * as SELECTORS from '../selectors'

const styles = {
  root: {},
  options: {
    marginTop: 40,
  },
}

const AccountLocked = ({
  className,
  classes,
  layoutProps,
  accountId,
  bankName,
  bankLogoUrl,
}) => (
  <StepLayout {...layoutProps} className={cx(classes.root, className)} noFooter>
    <StepBankLogo bankName={bankName} bankLogoUrl={bankLogoUrl} />
    <StepTitle>Oops! Your account is locked</StepTitle>
    <StepDescription>
      Please use one of the options below
      <br />
      to resolve the issue
    </StepDescription>
    <OptionsList className={classes.options}>
      <OptionsListItem
        primaryText="Go to settings"
        primaryTextIcon={<BankIcon />}
        href={createRouteUrl(ROUTES.account.settings.root, { accountId })}
      />
    </OptionsList>
  </StepLayout>
)

export default reconnect({
  accountId: SELECTORS.accountId,
  bankName: SELECTORS.bankName,
  bankLogoUrl: SELECTORS.bankLogoUrl,
})(injectStyles(styles)(AccountLocked))
