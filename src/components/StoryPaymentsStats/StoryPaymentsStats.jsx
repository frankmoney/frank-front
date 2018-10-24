import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { formatDateRange } from 'utils/datesLight'
import CurrencyContext from 'contexts/CurrencyContext'
import styles from './StoryPaymentsStats.jss'

const StoryPaymentsStats = ({
  classes,
  classNames: {
    root: rootClassName,
    symbol: symbolClassName,
    counter: counterClassName,
  } = {},
  paymentsCount,
  paymentsDateRange,
}) => (
  <div className={cx(classes.container, rootClassName)}>
    <CurrencyContext.Consumer>
      {(context = {}) => (
        <context.icon className={cx(classes.symbol, symbolClassName)} />
      )}
    </CurrencyContext.Consumer>
    <span className={cx(classes.counter, counterClassName)}>
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
