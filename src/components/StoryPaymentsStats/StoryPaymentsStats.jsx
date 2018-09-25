import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { formatDateRange } from 'utils/datesLight'
import CurrencyContext from 'contexts/CurrencyContext'
import styles from './StoryPaymentsStats.jss'

const StoryPaymentsStats = ({
  classes,
  className,
  paymentsCount,
  paymentsDateRange,
}) => (
  <div className={cx(classes.container, className)}>
    <CurrencyContext.Consumer>
      {(context = {}) => <context.icon className={classes.symbol} />}
    </CurrencyContext.Consumer>
    <span className={classes.counter}>
      {`${paymentsCount} payment${paymentsCount > 1 ? 's' : ''} `}
    </span>
    <span className={classes.dateRange}>
      {formatDateRange(...paymentsDateRange, {
        short: true,
      })}
    </span>
  </div>
)

export default injectStyles(styles)(StoryPaymentsStats)
