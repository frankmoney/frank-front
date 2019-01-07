// @flow strict
import React from 'react'
import cx from 'classnames'
import CurrencyContext from 'contexts/CurrencyContext'
import { formatDateRange, type DateString } from 'utils/dates'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import styles from './StoryPaymentsStats.jss'

export type StoryPaymentsStatsProps = {|
  paymentsCount: number,
  paymentsDateRange: [DateString, DateString],
|}

type Props = {|
  ...InjectStylesProps,
  ...StoryPaymentsStatsProps,
  //
  counterClassName?: string,
  symbolClassName?: string,
  dateRangeClassName?: string,
|}

const StoryPaymentsStats = ({
  classes,
  className,
  paymentsCount,
  paymentsDateRange,
  dateRangeClassName,
  symbolClassName,
  counterClassName,
}: Props) => (
  <div className={cx(classes.container, className)}>
    <CurrencyContext.Consumer>
      {(context = {}) => (
        <context.icon className={cx(classes.symbol, symbolClassName)} />
      )}
    </CurrencyContext.Consumer>
    <span className={cx(classes.counter, counterClassName)}>
      {`${paymentsCount} payment${paymentsCount > 1 ? 's' : ''} `}
    </span>
    <span className={cx(classes.dateRange, dateRangeClassName)}>
      {formatDateRange(...paymentsDateRange, {
        short: true,
      })}
    </span>
  </div>
)

export default injectStyles(styles)(StoryPaymentsStats)
