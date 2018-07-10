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

const render = ({ classes, symbol, value, formatter }) => (
  <div className={classes.root}>
    <div
      className={classes.sign}
      dangerouslySetInnerHTML={{
        __html: isNegative(value) ? '&minus;' : '&plus;',
      }}
    />
    <div className={classes.symbol}>{symbol}</div>{' '}
    <div
      className={cx(
        classes.value,
        isNegative(value) ? classes.negative : classes.positive
      )}
    >
      {formatter(value, undefined, true)}
    </div>
  </div>
)

const CurrencyDelta = ({ classes, symbol, value, formatter }) => (
  <CurrencyContext.Consumer>
    {(context = {}) =>
      render({
        classes,
        symbol: symbol || context.symbol,
        value,
        formatter: formatter || context.formatter || defaultFormatter,
      })
    }
  </CurrencyContext.Consumer>
)

export default injectStyles(styles)(CurrencyDelta)
