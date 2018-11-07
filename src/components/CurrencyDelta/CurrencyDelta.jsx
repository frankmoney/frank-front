// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import {
  defaultFormatter,
  type CurrencyFormatter,
} from 'components/CurrencyProvider'
import CurrencyContext from 'contexts/CurrencyContext'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const isNegative: (?number) => boolean = value =>
  // $FlowFixMe: value is not undefined at the point of toString
  !R.isNil(value) && value.toString()[0] === '-'

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

type Props = {|
  ...InjectStylesProps,
  //
  formatter: CurrencyFormatter,
  symbol?: string,
  value?: number,
  valueClassName?: string,
|}

const render = ({
  classes,
  className,
  formatter,
  symbol,
  value,
  valueClassName,
}: Props) => (
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
}: Props) => (
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
