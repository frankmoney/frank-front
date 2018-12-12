import React from 'react'
import CurrencyProvider from 'components/CurrencyProvider'
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
            onRemove={() => onRemoveItem(payment.id)}
            {...payment}
          />
        ))}
    </CurrencyProvider>
  </div>
)

export default PaymentsList
