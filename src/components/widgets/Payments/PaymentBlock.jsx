// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { type Payment as PaymentProps } from 'data/models/payment'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Payment, { type PaymentCbProps } from './Payment'

const styles = theme => ({
  titleBar: {
    display: 'flex',
    background: '#F8F9F9',
    borderRadius: 8,
    padding: [6, 10, 8],
  },
  title: {
    ...theme.fontMedium(18, 26),
    flex: 1,
  },
  subtitle: {
    ...theme.fontRegular(18, 26),
    color: '#B9BBC2',
  },
})

type Props = {|
  ...InjectStylesProps,
  ...PaymentCbProps,
  //
  items: Array<PaymentProps>,
  showCategories: boolean,
  subtitle?: string,
  title: string,
  // Styles
  paymentClassName?: string,
  titleClassName?: string,
|}

const PaymentBlock = ({
  classes,
  className,
  items,
  onPaymentClick,
  paymentClassName,
  showCategories,
  subtitle,
  title,
  titleClassName,
}: Props) => (
  <div className={className}>
    <div className={cx(classes.titleBar, titleClassName)}>
      <div className={classes.title}>{title}</div>
      {subtitle && <div className={classes.subtitle}>{subtitle}</div>}
    </div>
    {R.map(
      ({ id, ...payment }) => (
        <Payment
          className={paymentClassName}
          showCategory={showCategories}
          key={id}
          onPaymentClick={onPaymentClick ? () => onPaymentClick(id) : null}
          {...payment}
        />
      ),
      items
    )}
  </div>
)

export default injectStyles(styles)(PaymentBlock)
