// @flow strict-local
import React from 'react'
import cx from 'classnames'
import Paper from 'components/kit/Paper'
import CategoryLabel from 'components/CategoryLabel'
import BankDescription from 'components/common/BankDescription'
import { injectStyles } from 'utils/styles'
import PaymentCardHead from './PaymentCardHead'
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
    <PaymentCardHead
      className={classes.head}
      amount={amount}
      postedOn={postedOn}
      verified={verified}
    />
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
