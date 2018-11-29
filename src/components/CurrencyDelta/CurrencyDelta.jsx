// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { defaultFormatter } from 'components/CurrencyProvider'
import CurrencyContext, {
  type CurrencyFormatter,
} from 'contexts/CurrencyContext'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { isNegative } from 'data/models/payment'

const styles = {
  root: {
    display: 'inline-block',
  },
  sign: {
    display: 'inline-block',
    color: 'rgba(37, 43, 67, 0.2)',
  },
  symbol: {
    display: 'inline-block',
    color: 'rgba(37, 43, 67, 0.2)',
  },
  value: {
    display: 'inline-block',
    '&$negative': {
      color: 'rgba(37, 43, 67)',
    },
    '&$positive': {
      color: '#2fce6b',
    },
  },
  negative: {},
  positive: {},
}

type CommonProps = {|
  ...InjectStylesProps,
  //
  symbol?: string,
  value: number,
  valueClassName?: string,
|}

type RenderProps = {|
  ...CommonProps,
  formatter: CurrencyFormatter,
|}

type Props = {|
  ...CommonProps,
  formatter?: CurrencyFormatter,
|}

const render = ({
  classes,
  className,
  formatter,
  symbol,
  value,
  valueClassName,
}: RenderProps) => (
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
        {
          [classes.negative]: isNegative(value),
          [classes.positive]: !isNegative(value),
        },
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
        formatter:
          formatter || (context && context.formatter) || defaultFormatter,
        symbol: symbol || (context && context.symbol),
        value,
        valueClassName,
      })
    }
  </CurrencyContext.Consumer>
)

export default injectStyles(styles)(CurrencyDelta)
