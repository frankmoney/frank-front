// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import { formatFullDate } from 'utils/dates'
import Paper from 'components/kit/Paper/index'
import CurrencyDelta from 'components/CurrencyDelta/index'
import BankDescription from 'components/common/BankDescription/index'
import PaymentStatus from 'components/admin/PaymentStatus'
import styles from './PaymentCard.jss'

const PendingPaymentCard = ({
  classes,
  className,
  postedOn,
  amount,
  verified,
  pending,
  source,
}) => (
  <Paper type="card" className={cx(classes.root, classes.pending, className)}>
    <div className={classes.header}>
      {pending && <div className={classes.pendingText}>Pending</div>}
      <div className={classes.createdAt}>{formatFullDate(postedOn, true)}</div>
      <div className={classes.amount}>
        <CurrencyDelta value={amount} faint={pending} />
        <PaymentStatus
          className={classes.status}
          verified={verified}
          pending={pending}
        />
      </div>
    </div>
    <BankDescription
      className={classes.bank}
      logoClassName={classes.bankLogo}
      textClassName={classes.bankDescription}
      {...source}
    />
  </Paper>
)

export default injectStyles(styles)(PendingPaymentCard)
