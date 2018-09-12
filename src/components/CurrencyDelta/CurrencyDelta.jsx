import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import * as R from 'ramda'
import { defaultFormatter } from 'components/CurrencyProvider'
import CurrencyContext from 'contexts/CurrencyContext'

const isNegative = value => !R.isNil(value) && value.toString()[0] === '-'

const styles = {
  negative: {},
  positive: {},
  root: {
    display: 'inline-block',
  },
  sign: {
    display: 'inline-block',
    color: 'rgba(37, 43, 67, 0.3)',
  },
  symbol: {
    display: 'inline-block',
    color: 'rgba(37, 43, 67, 0.3)',
  },
  value: {
    display: 'inline-block',
    '&$positive': {
      color: '#2fce6b',
    },
  },
}

const render = ({
  classes,
  className,
  formatter,
  symbol,
  value,
  valueClassName,
}) => (
  <div className={cx(classes.root, className)}>
    <div
      className={classes.sign}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: isNegative(value) ? '&minus;' : '&plus;',
      }}
    />
    <div className={classes.symbol}>{symbol}</div>{' '}
    <div
      className={cx(
        classes.value,
        isNegative(value) ? classes.negative : classes.positive,
        valueClassName
      )}
    >
      {formatter(value, undefined, true)}
    </div>
  </div>
)

const CurrencyDelta = ({
  classes,
  className,
  formatter,
  symbol,
  value,
  valueClassName,
}) => (
  <CurrencyContext.Consumer>
    {(context = {}) =>
      render({
        classes,
        className,
        formatter: formatter || context.formatter || defaultFormatter,
        symbol: symbol || context.symbol,
        value,
        valueClassName,
      })
    }
  </CurrencyContext.Consumer>
)

export default injectStyles(styles)(CurrencyDelta)
