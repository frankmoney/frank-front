// @flow
import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { createRouteUrl } from '@frankmoney/utils'
import CurrencyDelta from 'components/CurrencyDelta'
import { formatShortDate, type DateString } from 'utils/dates'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { ROUTES } from 'const'
import { DEFAULT_DRAWER_ROW_HEIGHT as ROW_HEIGHT } from '../constants'

export const isNegative = value => typeof value === 'number' && value < 0

const styles = theme => ({
  root: {
    height: ROW_HEIGHT,
    ...theme.fontRegular(16, 20),
    color: 'rgba(37, 43, 67, 0.3)',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'rgba(37, 43, 67, 0.03)',
    },
  },
  currentPayment: {
    color: '#4C51F3',
    backgroundColor: 'rgba(76, 81, 243, 0.05)',
    '& $sumValue': {
      opacity: ({ amount }) => (isNegative(amount) ? 0.7 : 1),
    },
  },
  inChainPayment: {
    '& $sumValue': {
      opacity: ({ amount }) => (isNegative(amount) ? 0.3 : 0.7),
    },
  },
  lastInChainPayment: {
    color: 'rgba(37, 43, 67, 0.7)',
    backgroundColor: 'unset',
    '& $sumValue': {
      opacity: ({ amount }) => (isNegative(amount) ? 0.7 : 1),
    },
  },
  noSeparator: {},
  border: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    borderTop: '1px solid #F0F0F2',
    '$root:hover &, $root:hover + $root &, $noSeparator &, $currentPayment &, $currentPayment + $root &': {
      borderTop: '1px solid transparent',
    },
  },
  sum: {
    flex: 1,
  },
  sumValue: {},
  description: {
    flex: 3,
    padding: [0, 15],
    fontWeight: 400,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  date: {
    textAlign: 'right',
  },
})

type RowType = 'marked' | 'last'

type Props = {|
  ...InjectStylesProps,
  noSeparator?: boolean,
  // Payment details
  amount?: number,
  description?: string,
  postedOn?: DateString,
  // Other props
  type?: RowType,
  style?: any,
|}

const PaymentSimilarRow = ({
  classes,
  className,
  accountId,
  id: paymentId,
  amount,
  description,
  postedOn,
  style,
  type: rowType,
  noSeparator,
}: Props) => {
  const url = createRouteUrl(ROUTES.payment.idRoot, { accountId, paymentId })

  const marked = rowType === 'marked'
  const last = rowType === 'last'

  return (
    <Link
      className={cx(
        classes.root,
        {
          [classes.noSeparator]: noSeparator,
          [classes.currentPayment]: marked,
          [classes.lastInChainPayment]: last,
          [classes.inChainPayment]: !marked && !last,
        },
        className
      )}
      style={style}
      to={url}
    >
      <div className={classes.border}>
        <CurrencyDelta
          className={classes.sum}
          value={amount}
          valueClassName={classes.sumValue}
        />
        <div className={classes.description}>{description}</div>
        <div className={classes.date}>{formatShortDate(postedOn, true)}</div>
      </div>
    </Link>
  )
}

export default injectStyles(styles)(PaymentSimilarRow)
