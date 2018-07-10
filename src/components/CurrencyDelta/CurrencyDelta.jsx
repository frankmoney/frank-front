import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import CurrencyContext from 'contexts/CurrencyContext'

const styles = {
  pos: {},
  neg: {},
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
    '$pos &': {
      color: '#2fce6b',
    },
  },
}

const CurrencyDelta = ({ classes, symbol, value }) => (
  <div
    className={cx(classes.root, value[0] === '-' ? classes.neg : classes.pos)}
  >
    <div
      className={classes.sign}
      dangerouslySetInnerHTML={{
        __html: value[0] === '-' ? '&minus;' : '&plus;',
      }}
    />
    <div className={classes.symbol}>{symbol}</div>{' '}
    <div className={classes.value}>{value.substr(1)}</div>
  </div>
)

const StyledCurrencyDelta = injectStyles(styles)(CurrencyDelta)

export default props => (
  <CurrencyContext.Consumer>
    {({ symbol }) => <StyledCurrencyDelta symbol={symbol} {...props} />}
  </CurrencyContext.Consumer>
)
