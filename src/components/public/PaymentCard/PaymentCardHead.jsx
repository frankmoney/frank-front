// @flow strict-local
import React from 'react'
import cx from 'classnames'
import CurrencyDelta from 'components/CurrencyDelta'
import { formatShortDate } from 'utils/dates'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-between',
  },
  headLeft: {
    opacity: 0.3,
    ...theme.fontRegular(20, 26),
  },
  headRight: {
    textAlign: 'right',
  },
  amount: {
    ...theme.fontRegular(30),
  },
  postedOn: {
    marginTop: 8,
    ...theme.fontRegular(16, 20),
    opacity: 0.2,
  },
})

const PaymentCardHead = ({
  classes,
  className,
  verified,
  amount,
  postedOn,
}) => (
  <div className={cx(classes.head, className)}>
    <div className={classes.headLeft}>{!verified && 'No description'}</div>
    <div className={classes.headRight}>
      <CurrencyDelta className={classes.amount} value={amount} />
      <div className={classes.postedOn}>{formatShortDate(postedOn, true)}</div>
    </div>
  </div>
)

export default injectStyles(styles)(PaymentCardHead)
