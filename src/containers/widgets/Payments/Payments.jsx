// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import D from 'date-fns/fp'
import CurrencyProvider from 'components/CurrencyProvider'
import type { Payment as PaymentProps } from 'data/models/payment'
import PaymentBlock from './PaymentBlock'

const dateProp = R.prop('postedOn')
const fullMonthProp = R.pipe(
  dateProp,
  D.format('MMMM')
)
const groupPayments = R.pipe(
  R.sortBy(dateProp),
  R.groupBy(fullMonthProp),
  R.toPairs,
  R.addIndex(R.map)(([title, items], key) => ({
    items,
    key,
    title,
  }))
)

export type PaymentsProps = {|
  paymentsData: Array<PaymentProps>,
  showCategories: boolean,
|}

type Props = {|
  ...PaymentsProps,
  //
  blockClassName?: string,
  blockTitleClassName?: string,
  className?: string,
  paymentClassName?: string,
|}

const Payments = ({
  blockClassName,
  blockTitleClassName,
  className,
  paymentClassName,
  paymentsData,
  showCategories,
}: Props) => {
  const groups = groupPayments(paymentsData)

  return (
    <CurrencyProvider code="USD">
      <div className={className}>
        {R.map(
          group => (
            <PaymentBlock
              className={blockClassName}
              paymentClassName={paymentClassName}
              showCategories={showCategories}
              titleClassName={blockTitleClassName}
              {...group}
            />
          ),
          groups
        )}
      </div>
    </CurrencyProvider>
  )
}

export default Payments
