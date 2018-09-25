import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import CurrencyDelta from 'components/CurrencyDelta'
import CurrencyProvider from 'components/CurrencyProvider'
import { mapPayment } from 'data/models/payment'
import { formatFullDate } from 'utils/datesLight'

const styles = theme => ({
  item: {
    padding: [25, 0],
    display: 'flex',
    flexDirection: 'row',
    '&:not(:first-child)': {
      borderTop: '1px solid rgba(0, 0, 0, 0.05);',
    },
  },
  amount: {
    width: '25%',
    ...theme.fontRegular(18, 36),
  },
  info: {
    width: '75%',
  },
  row: {
    display: 'flex',
    alignItems: 'baseline',
  },
  recipient: {
    flex: [3, 1],
    ...theme.fontMedium(18, 36),
  },
  date: {
    flex: [1, 1],
    ...theme.fontRegular(16, 26),
    color: 'rgba(37, 43, 67, 0.4)',
    textAlign: 'right',
  },
  description: {
    ...theme.fontRegular(16, 22),
    color: 'rgba(37, 43, 67, 0.4)',
  },
})

const Item = ({ classes, amount, description, peerName, postedOn }) => (
  <div className={classes.item}>
    <div className={classes.amount}>
      <CurrencyDelta value={amount} />
    </div>
    <div className={classes.info}>
      <div className={classes.row}>
        <div className={classes.recipient}>{peerName}</div>
        <div className={classes.date}>{formatFullDate(postedOn)}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  </div>
)

const PaymentsList = ({ payments, currencyCode, className, classes }) => (
  <div className={className}>
    <CurrencyProvider code={currencyCode}>
      {payments &&
        payments.map(payment => (
          <Item classes={classes} {...mapPayment(payment)} />
        ))}
    </CurrencyProvider>
  </div>
)

export default injectStyles(styles)(PaymentsList)
