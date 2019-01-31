// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { defaultFormatter } from 'components/CurrencyProvider'
import CurrencyContext, {
  type CurrencyFormatter,
} from 'contexts/CurrencyContext'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

export const isNegative = value => typeof value === 'number' && value < 0

const POSITIVE_COLOR = '#2fce6b'
const NEGATIVE_COLOR = 'rgba(37, 43, 67)'

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
      color: NEGATIVE_COLOR,
    },
    '&$positive': {
      color: POSITIVE_COLOR,
    },
  },
  faint: {
    '& $value$negative': {
      color: 'rgba(33, 203, 97, 0.7)',
    },
    '& $value$positive': {
      color: 'rgba(37, 43, 67, 0.5)',
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
  faint?: boolean,
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
  faint,
  valueClassName,
}: RenderProps) => (
  <div className={cx(classes.root, { [classes.faint]: !!faint }, className)}>
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

const renderToString = ({ formatter, symbol, value }: RenderProps) => {
  const sign = isNegative(value) ? '-' : '+'
  const number = formatter(value, undefined, true)

  return `${sign}${symbol} ${number}`
}

const CurrencyDelta = ({
  classes,
  className,
  formatter,
  symbol,
  value,
  valueClassName,
  ...otherProps
}: Props) => (
  <CurrencyContext.Consumer>
    {context =>
      render({
        classes,
        className,
        formatter:
          formatter || (context && context.formatter) || defaultFormatter,
        symbol: symbol || (context && context.symbol),
        value,
        valueClassName,
        ...otherProps,
      })
    }
  </CurrencyContext.Consumer>
)

CurrencyDelta.TextRender = ({ children }) => (
  <CurrencyContext.Consumer>
    {({ formatter, symbol }) =>
      children(value => renderToString({ formatter, symbol, value }))
    }
  </CurrencyContext.Consumer>
)

export default injectStyles(styles)(CurrencyDelta)
