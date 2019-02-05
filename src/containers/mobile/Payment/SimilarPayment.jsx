// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import CurrencyDelta from 'components/CurrencyDelta'
import { type PaymentCbProps } from 'components/widgets/Payments/Payment'
import { type Payment } from 'data/models/payment'
import { formatShortDate } from 'utils/dates'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    borderBottom: '1px solid #F0F0F2',
    display: 'flex',
    flexDirection: 'column',
    padding: [11, 20, 18],
    cursor: 'pointer',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  amount: {
    ...theme.fontRegular(18, 36),
  },
  postedOn: {
    ...theme.fontRegular(16, 26),
    color: '#BCBFC9',
  },
  peer: {
    ...theme.fontMedium(16, 26),
    marginTop: -1,
  },
})

type Props = {|
  ...InjectStylesProps,
  ...Payment,
  ...PaymentCbProps,
  //
  key?: React.Key,
|}

const SimilarPayment = ({
  amount,
  classes,
  className,
  key,
  onPaymentClick,
  peer,
  postedOn,
}: Props) => (
  <div
    className={cx(classes.root, className)}
    onClick={onPaymentClick}
    key={key}
  >
    <div className={classes.info}>
      <CurrencyDelta className={classes.amount} value={amount} />
      <div className={classes.postedOn}>{formatShortDate(postedOn, true)}</div>
    </div>
    {peer && <div className={classes.peer}>{peer.name}</div>}
  </div>
)

export default injectStyles(styles)(SimilarPayment)
