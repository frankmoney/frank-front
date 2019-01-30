// @flow strict-local
import React from 'react'
import { defaultFormatter } from 'components/CurrencyProvider'
import CurrencyContext from 'contexts/CurrencyContext'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

type Props = {|
  ...InjectStylesProps,
  className?: string,
  value: number,
|}

export const isNegative = value => typeof value === 'number' && value < 0

const styles = {
  symbol: {
    color: 'rgba(37, 43, 67, 0.3)',
  },
}

const render = ({ classes, className, value, symbol, formatter }) => (
  <span className={className}>
    {symbol && <span className={classes.symbol}>{symbol}&nbsp;</span>}
    {isNegative(value) && (
      <span dangerouslySetInnerHTML={{ __html: '&minus;' }} />
    )}
    {formatter(value, undefined, true)}
  </span>
)

const CurrencyValue = ({ classes, className, value }: Props) => (
  <CurrencyContext.Consumer>
    {context =>
      render({
        classes,
        className,
        value,
        symbol: (context && context.symbol) || '',
        formatter: (context && context.formatter) || defaultFormatter,
      })
    }
  </CurrencyContext.Consumer>
)

export default injectStyles(styles)(CurrencyValue)
