import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import cx from 'classnames'
import { formatCurrency } from '@frankmoney/components'
import reconnect from 'utils/reconnect'
import StepTitle from 'components/onboarding/StepTitle'
import OptionsList, { AccountListItem } from 'components/onboarding/OptionsList'
import StepBankLogo from 'components/onboarding/StepBankLogo'
import StepLayout from 'containers/admin/Onboarding/StepLayout'
import { accountsSelector, selectedAccountIdSelector } from '../../selectors'
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
  <StepLayout
    className={cx(classes.root, className)}
    backLabel="Enter new credentials"
  >
    <StepBankLogo />
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
