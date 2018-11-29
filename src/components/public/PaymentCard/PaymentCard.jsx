// @flow
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import CurrencyDelta from 'components/CurrencyDelta'
import Paper from 'components/kit/Paper'
import { formatShortDate } from 'utils/dates'
import { injectStyles } from 'utils/styles'
import CategoryLabel from 'components/CategoryLabel'
import BankDescription from 'components/common/BankDescription'
import styles from './PaymentCard.jss'

const PaymentCard = ({
  classes,
  className,
  id,
  amount,
  postedOn,
  peer = {},
  category = {},
  description = null,
  verified = false,
  paperPadding,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <div className={classes.head}>
      <div className={classes.headLeft}>{!verified && 'No description'}</div>
      <div className={classes.headRight}>
        <CurrencyDelta className={classes.amount} value={amount} />
        <div className={classes.postedOn}>
          {formatShortDate(postedOn, true)}
        </div>
      </div>
    </div>

    <div className={classes.info}>
      {verified && (
        <>
          <div className={classes.peer}>{peer.name}</div>
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
      <BankDescription className={classes.bank} />
    </div>
  </Paper>
)

export default injectStyles(styles)(PaymentCard)
