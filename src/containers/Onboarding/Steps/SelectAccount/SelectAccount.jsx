import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import OptionsList, { AccountListItem } from '../../OptionsList'
import StepBankLogo from '../../StepBankLogo'

const styles = {
  root: {},
  accounts: {
    marginTop: 50,
  },
}

const SelectAccount = ({ className, classes }) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepBankLogo />
    <StepTitle>Select your account</StepTitle>
    <OptionsList className={classes.accounts}>
      <AccountListItem
        accountName="Chase"
        accountBalance="$ 9,120.00"
        accountNumber="······· 5951"
      />
      <AccountListItem
        accountName="Save the ocean"
        accountBalance="$ 1,000.00"
        accountNumber="······· 4197"
        selected
      />
      <AccountListItem
        accountName="Weird wishes"
        accountBalance="$ 5,998.00"
        accountNumber="······· 3281"
      />
    </OptionsList>
  </StepLayout>
)

export default injectStyles(styles)(SelectAccount)
