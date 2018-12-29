import { createRouteUrl } from '@frankmoney/utils'
import React from 'react'
import CurrencyProvider from 'components/CurrencyProvider'
import { ROUTES } from '../../const'
import PaymentsListItem from './PaymentsListItem'

const PaymentsList = ({
  payments,
  currencyCode,
  onRemoveItem,
  ...otherProps
}) => (
  <div {...otherProps}>
    <CurrencyProvider code={currencyCode}>
      {payments &&
        payments.map(payment => (
          <PaymentsListItem
            onRemove={onRemoveItem ? () => onRemoveItem(payment.id) : null}
            href={
              onRemoveItem
                ? null
                : createRouteUrl(ROUTES.account.payment.idRoot, {
                    paymentId: payment.id,
                    accountId: payment.accountId,
                  })
            }
            {...payment}
          />
        ))}
    </CurrencyProvider>
  </div>
)

export default PaymentsList
