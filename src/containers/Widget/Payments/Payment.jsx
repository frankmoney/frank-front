import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { format as formatDate } from 'date-fns'
import { injectStyles } from '@frankmoney/ui'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'

const PADDING = 16

const styles = theme => ({
  root: {
    margin: [0, 10],
    padding: [PADDING, 0],
    position: 'relative',
    '&:not(:last-child)': {
      borderBottom: '1px solid #E9EAEC',
    },
  },
  title: {
    ...theme.fontMedium(16, 26),
  },
  amount: {
    position: 'absolute',
    right: 0,
    top: PADDING,
  },
  amountValue: {
    fontWeight: 500,
  },
  category: {
    fontWeight: 500,
    marginTop: 9,
  },
  categoryIcon: {
    height: 12,
    width: 12,
    marginBottom: -1,
  },
  description: {
    color: '#8F93A4',
    marginTop: 2,
  },
  date: {
    color: '#BCBFC9',
    position: 'absolute',
    bottom: PADDING,
    right: 0,
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
      <div className={classes.title}>{peerName}</div>
      <CurrencyDelta
        className={classes.amount}
        valueClassName={classes.amountValue}
        value={amount}
      />
      <div className={classes.description}>
        {description || 'Placeholder description..' // FIXME: properly handle empty description
        }
      </div>
      <div className={classes.date}>{date}</div>
      {showCategory && (
        <CategoryLabel
          className={classes.category}
          iconClassName={classes.categoryIcon}
          color={color}
          name={name}
        />
      )}
    </div>
  )
}

export const paymentProps = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string,
  peerName: PropTypes.string.isRequired,
  postedOn: PropTypes.string.isRequired,
}

Payment.propTypes = {
  ...paymentProps,
  showCategory: PropTypes.bool,
}

export default injectStyles(styles)(Payment)
