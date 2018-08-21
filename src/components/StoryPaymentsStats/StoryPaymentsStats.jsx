import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { formatDateRange } from 'utils/dates'
import { CURRENCY_INFO } from 'components/CurrencyProvider'
import styles from './StoryPaymentsStats.jss'

const StoryPaymentsStats = ({
  classes,
  className,
  paymentsCurrency,
  paymentsCounter,
  paymentsDateRange,
}) => (
  <div className={cx(classes.container, className)}>
    <span className={classes.symbol}>
      {CURRENCY_INFO[paymentsCurrency].symbol}
    </span>
    <span className={classes.counter}>
      {`${paymentsCounter} payment${paymentsCounter > 1 && 's'} `}
    </span>
    <span className={classes.dateRange}>
      {formatDateRange(...paymentsDateRange, {
        short: true,
      })}
    </span>
  </div>
)

export default injectStyles(styles)(StoryPaymentsStats)
