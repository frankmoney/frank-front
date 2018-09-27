import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { format as formatDate } from 'date-fns'
import { injectStyles } from '@frankmoney/ui'
import { paymentProps } from 'data/models/payment'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'

const styles = theme => ({
  root: {
    display: 'flex',
    margin: [0, 10],
    padding: [16, 0, 18],
    '&:not(:last-child)': {
      borderBottom: '1px solid #E9EAEC',
    },
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  right: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  description: {
    ...theme.fontRegular(18, 26),
    color: '#8F93A4',
  },
  peerName: {
    ...theme.fontMedium(16, 22),
    marginTop: 6,
  },
  amount: {
    ...theme.fontRegular(18, 26),
    display: 'flex',
    flexWrap: 'nowrap',
  },
  amountValue: {
    marginLeft: 4,
  },
  category: {
    ...theme.fontMedium(16, 22),
    margin: [13, 0, 0, -1],
  },
  categoryIcon: {
    height: 12,
    marginBottom: 2,
    width: 12,
  },
  date: {
    ...theme.fontRegular(16, 22),
    color: '#BCBFC9',
  },
})

const Payment = ({
  amount,
  category: { color, name },
  classes,
  className,
  description,
  peerName,
  postedOn,
  showCategory,
}) => {
  const date = formatDate(postedOn, 'MMM D')
  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.left}>
        <div className={classes.description}>
          {description || '[empty description. plz fix]'
          // FIXME: remove dev placeholder
          }
        </div>
        <div className={classes.peerName}>{peerName}</div>
        {showCategory && (
          <CategoryLabel
            className={classes.category}
            iconClassName={classes.categoryIcon}
            color={color}
            name={name}
          />
        )}
      </div>
      <div className={classes.right}>
        <CurrencyDelta
          className={classes.amount}
          valueClassName={classes.amountValue}
          value={amount}
        />
        <div className={classes.date}>{date}</div>
      </div>
    </div>
  )
}

Payment.propTypes = {
  ...paymentProps,
  showCategory: PropTypes.bool,
}

export default injectStyles(styles)(Payment)
