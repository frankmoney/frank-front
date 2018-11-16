// @flow
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import CurrencyDelta from 'components/CurrencyDelta'
import Paper from 'components/kit/Paper'
import { formatShortDate } from 'utils/dates'
import { injectStyles } from 'utils/styles'
import CategoryLabel from 'components/CategoryLabel'
import styles from './PaymentCard.jss'

const pendingText = 'Payment info will follow soon...'

const PaymentCard = ({
  classes,
  className,
  id,
  amount,
  postedOn,
  peer: { name } = {},
  category = {},
  description = null,
  pending = false,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <div className={classes.head}>
      <CurrencyDelta className={classes.amount} value={amount} />
      <div className={classes.postedOn}>{formatShortDate(postedOn, true)}</div>
    </div>
    <div className={classes.info}>
      <div className={classes.peer}>{pending ? pendingText : name}</div>
      {!pending && (
        <>
          {description && (
            <div className={classes.description}>{description}</div>
          )}
          <CategoryLabel
            className={classes.categoryItem}
            iconClassName={classes.categoryIcon}
            {...category}
          />
        </>
      )}
      <div className={classes.bank} />
    </div>
  </Paper>
)

export default injectStyles(styles)(PaymentCard)
