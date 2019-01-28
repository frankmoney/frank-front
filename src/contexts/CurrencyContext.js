// @flow strict
import * as React from 'react'

export type CurrencyFormatter = (
  value: number,
  precision?: number,
  abs?: boolean
) => string

export type CurrencyCode = 'USD' | 'RUB'

type CurrencySymbol = '$' | '₽'

type CurrencyPosition = 'before' | 'after'

export type CurrencyProps = {|
  code: CurrencyCode,
  symbol: CurrencySymbol,
  position: CurrencyPosition,
|}

export type ContextPayload = {|
  ...CurrencyProps,
  icon?: React.Node,
  formatter?: CurrencyFormatter,
|}

const context: React.Context<ContextPayload> =
  // flowlint-next-line unclear-type:off
  (React.createContext({ code: 'USD' }): any)

export default context
