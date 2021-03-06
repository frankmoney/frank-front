// @flow
import * as React from 'react'
import { AttachMoney as DollarIcon } from 'material-ui-icons'
import CurrencyContext, {
  type CurrencyCode,
  type CurrencyFormatter,
} from 'contexts/CurrencyContext'

const CURRENCY_INFO = {
  USD: {
    code: 'USD',
    symbol: '$',
    icon: DollarIcon,
    position: 'before',
  },
  RUB: {
    code: 'RUB',
    symbol: '₽',
    position: 'after',
  },
}

type Props = {|
  children: React.Node,
  code: CurrencyCode,
  formatter?: CurrencyFormatter,
|}

export const defaultFormatter: CurrencyFormatter = (
  value,
  precision = 2,
  abs = false
) => {
  const fixed = value.toFixed(precision)
  const format = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
  })
  const digitsOnly =
    abs && (fixed[0] === '-' || fixed[0] === '+') ? fixed.substr(1) : fixed
  const digitsAsNumber: number = (digitsOnly: any)
  return format.format(digitsAsNumber)
}

const CurrencyProvider = ({ code, formatter, children }: Props) => (
  <CurrencyContext.Consumer>
    {context => (
      <CurrencyContext.Provider
        value={{
          ...context,
          ...CURRENCY_INFO[code],
          formatter: formatter || context.formatter || defaultFormatter,
        }}
      >
        {children}
      </CurrencyContext.Provider>
    )}
  </CurrencyContext.Consumer>
)

export default CurrencyProvider
