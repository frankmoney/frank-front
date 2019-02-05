// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import D from 'date-fns/fp'
import CurrencyProvider from 'components/CurrencyProvider'
import type { Payment as PaymentProps } from 'data/models/payment'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { type PaymentCbProps } from './Payment'
import PaymentBlock from './PaymentBlock'

const styles = theme => ({
  root: {
    ...theme.fontRegular(18, 26),
  },
})

const dateProp = R.prop('postedOn')
const formattedDateProp = R.pipe(
  dateProp,
  D.format('MMMM YYYY')
)
const groupPayments = R.pipe(
  R.sortBy(dateProp),
  R.reverse,
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
  ...PaymentCbProps,
  paymentsData: Array<PaymentProps>,
  showCategories: boolean,
|}

type Props = {|
  ...InjectStylesProps,
  ...PaymentsProps,
  //
  blockClassName?: string,
  blockTitleClassName?: string,
  paymentClassName?: string,
|}

const Payments = ({
  blockClassName,
  blockTitleClassName,
  classes,
  className,
  onPaymentClick,
  paymentClassName,
  paymentsData,
  showCategories,
}: Props) => {
  const groups = groupPayments(paymentsData)
  return (
    <CurrencyProvider code="USD">
      <div className={cx(classes.root, className)}>
        {R.map(
          group => (
            <PaymentBlock
              className={blockClassName}
              onPaymentClick={onPaymentClick}
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

export default injectStyles(styles)(Payments)
