import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import OptionsListItem, { PrimaryText, SecondaryText } from './OptionsListItem'

const styles = {
  root: {
    padding: 20,
  },
  name: {},
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balance: {},
  number: {},
}

const AccountOptionsListItem = ({
  classes,
  className,
  accountName,
  accountBalance,
  accountNumber,
  ...props
}) => (
  <OptionsListItem className={cx(classes.root, className)} {...props}>
    <PrimaryText className={classes.name}>{accountName}</PrimaryText>
    <div className={classes.bottomRow}>
      <SecondaryText className={classes.balance}>
        {accountBalance}
      </SecondaryText>
      <SecondaryText className={classes.number}>{accountNumber}</SecondaryText>
    </div>
  </OptionsListItem>
)

export default injectStyles(styles)(AccountOptionsListItem)
