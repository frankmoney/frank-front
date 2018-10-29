import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import cx from 'classnames'
import { formatCurrency } from '@frankmoney/components'
import reconnect from 'utils/reconnect'
import { accountsSelector, selectedAccountIdSelector } from '../../selectors'
import StepLayout from '../../ConnectedStepLayout'
import StepTitle from '../../StepTitle'
import OptionsList, { AccountListItem } from '../../OptionsList'
import StepBankLogo from '../../StepBankLogo'
import * as ACTIONS from '../../actions'

const styles = {
  root: {},
  accounts: {
    marginTop: 50,
  },
}

const SelectAccount = ({
  className,
  classes,
  accounts,
  onAccountSelect,
  selectedAccountId,
}) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepBankLogo />
    <StepTitle>Select your account</StepTitle>
    <OptionsList className={classes.accounts}>
      {accounts.map(({ guid: id, name, balance }) => (
        <AccountListItem
          accountName={name}
          accountBalance={formatCurrency({ value: balance, precision: 2 })}
          accountNumber="······· 5951"
          selected={selectedAccountId === id}
          onClick={() => onAccountSelect(id)}
        />
      ))}
    </OptionsList>
  </StepLayout>
)

export default compose(
  reconnect(
    {
      accounts: accountsSelector,
      selectedAccountId: selectedAccountIdSelector,
    },
    {
      onAccountSelect: ACTIONS.accountSelect,
    }
  ),
  injectStyles(styles)
)(SelectAccount)
