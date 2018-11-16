// @flow strict
import React from 'react'
import cx from 'classnames'
import CurrencyContext from 'contexts/CurrencyContext'
import { formatDateRange, type DateDefaultString } from 'utils/datesLight'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import styles from './StoryPaymentsStats.jss'

export type StoryPaymentsStatsProps = {|
  paymentsCount: number,
  paymentsDateRange: [DateDefaultString, DateDefaultString],
|}

type Props = {|
  ...InjectStylesProps,
  ...StoryPaymentsStatsProps,
|}

const StoryPaymentsStats = ({
  classes,
  className,
  paymentsCount,
  paymentsDateRange,
}: Props) => (
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
