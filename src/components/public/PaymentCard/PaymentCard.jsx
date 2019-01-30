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
  source,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <PaymentCardHead
      className={classes.head}
      amount={amount}
      postedOn={postedOn}
      verified={verified}
    />
    <div>
      {verified && (
        <>
          <div className={classes.peer}>{peer.name}</div>
          <div className={classes.info}>
            {description && (
              <div className={classes.description}>{description}</div>
            )}
            <CategoryLabel
              className={classes.categoryItem}
              iconClassName={classes.categoryIcon}
              {...category}
            />
          </div>
        </>
      )}
      <BankDescription
        className={classes.bank}
        logoClassName={classes.bankLogo}
        {...source}
      />
    </div>
  </Paper>
)

export default injectStyles(styles)(PaymentCard)
