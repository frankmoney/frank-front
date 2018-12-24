// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import D from 'date-fns/fp'
import CurrencyProvider from 'components/CurrencyProvider'
import type { Payment as PaymentProps } from 'data/models/payment'
import PaymentBlock from './PaymentBlock'

const dateProp = R.prop('postedOn')
const formattedDateProp = R.pipe(
  dateProp,
  D.format('MMMM YYYY')
)
const groupPayments = R.pipe(
  R.sortBy(dateProp),
  R.groupBy(formattedDateProp),
  R.toPairs,
  R.addIndex(R.map)(([fullTitle, items], key) => {
    const [title, subtitle] = R.split(' ', fullTitle)
    return {
      items,
      key,
      title,
      subtitle,
    }
  })
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
