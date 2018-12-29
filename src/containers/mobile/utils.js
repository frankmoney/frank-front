// @flow strict
import { createRouteUrl } from '@frankmoney/utils'
import { type AccountId } from 'data/models/account'
import { type PaymentId } from 'data/models/payment'
import { ROUTES } from 'const'

type Params = { [string]: string | number | boolean }

// react-router History proxy
type History = Object // flowlint-line unclear-type:off

export type WithHistoryProps = {|
  history?: History,
|}

type PaymentClickCb = PaymentId => void

export const createMobileUrl = (route: string, params: Params) =>
  createRouteUrl(route, params, { public: true, mobile: true })

export const createPaymentClickHandler = (
  accountId: AccountId,
  history: ?History
): ?PaymentClickCb =>
  history
    ? paymentId => {
        const paymentUrl = createMobileUrl(ROUTES.account.payment.idRoot, {
          accountId,
          paymentId,
        })
        history.push(paymentUrl)
      }
    : null
