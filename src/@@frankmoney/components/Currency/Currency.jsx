import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import CurrencyContext from '@@frankmoney/contexts/CurrencyContext'

// use .toString() b/c value may be not Number (e.g. BigNumber.js)
const isNegative = value => !R.isNil(value) && value.toString()[0] === '-'

const styles = {
  root: {},
  sign: {},
  symbol: {},
}

const render = ({
  classes,
  className,
  currencySymbol,
  currencySymbolPosition,
  value,
  valueFormatter,
  valuePrecision,
}) => (
  <span className={cx(className, classes.root)}>
    {isNegative(value) && <span className={classes.sign}>&minus;</span>}
    {currencySymbolPosition === 'before' && (
      <span className={classes.symbol}>{currencySymbol}</span>
    )}
    {valueFormatter(value, valuePrecision)}
    {currencySymbolPosition === 'after' && (
      <span className={classes.symbol}>{currencySymbol}</span>
    )}
  </span>
)

const Currency = ({
  classes,
  className,
  currencySymbol,
  currencySymbolPosition,
  value,
  valueFormatter,
  valuePrecision,
}) => (
  <CurrencyContext.Consumer>
    {context =>
      render({
        classes,
        className,
        currencySymbol: currencySymbol || context.symbol,
        currencySymbolPosition: currencySymbolPosition || context.position,
        value,
        valueFormatter: valueFormatter || context.formatter,
        valuePrecision,
      })
    }
  </CurrencyContext.Consumer>
)

export default injectStyles(styles)(Currency)
