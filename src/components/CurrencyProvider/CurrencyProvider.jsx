import React from 'react'
import CurrencyContext from 'contexts/CurrencyContext'

const CURRENCY_INFO = {
  USD: {
    code: 'USD',
    symbol: '$',
    position: 'before',
  },
  RUB: {
    code: 'RUB',
    symbol: '₽',
    position: 'after',
  },
}

const CurrencyProvider = ({ code, children }) => (
  <CurrencyContext.Provider value={CURRENCY_INFO[code]}>
    {children}
  </CurrencyContext.Provider>
)

export default CurrencyProvider
