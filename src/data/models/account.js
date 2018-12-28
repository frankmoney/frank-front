// @flow strict
import { type CurrencyCode } from 'contexts/CurrencyContext'

export type AccountId = string | number

export type Account = {|
  id: AccountId,
  name: string,
  currencyCode: CurrencyCode,
|}
