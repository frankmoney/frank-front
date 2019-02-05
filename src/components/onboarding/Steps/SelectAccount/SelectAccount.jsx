import React from 'react'
import cx from 'classnames'
import { formatCurrency } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
import StepTitle from 'components/onboarding/StepTitle'
import OptionsList, { AccountListItem } from 'components/onboarding/OptionsList'
import StepBankLogo from 'components/onboarding/StepBankLogo'
import StepLayout from 'components/onboarding/StepLayout'

const styles = {
  root: {},
  accounts: {
    marginTop: 50,
  },
}

const SelectAccount = ({
  className,
  classes,
  layoutProps,
  accounts,
  onAccountSelect,
  selectedAccountId,
  bankName,
  bankLogoUrl,
}) => (
  <StepLayout
    {...layoutProps}
    className={cx(classes.root, className)}
    backLabel="Enter new credentials"
  >
    <StepBankLogo bankName={bankName} bankLogoUrl={bankLogoUrl} />
    <StepTitle>Select your account</StepTitle>
    <OptionsList className={classes.accounts}>
      {accounts.map(({ guid: id, name, balance }) => (
        <AccountListItem
          accountName={name}
          accountBalance={formatCurrency({ value: balance, precision: 2 })}
          selected={selectedAccountId === id}
          onClick={() => onAccountSelect(id)}
        />
      ))}
    </OptionsList>
  </StepLayout>
)

export default injectStyles(styles)(SelectAccount)
