// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import type { Payment as PaymentProps } from 'data/models/payment'
import Payment from './Payment'

const styles = theme => ({
  root: {},
  title: {
    ...theme.fontMedium(18, 26),
    background: '#F8F9F9',
    borderRadius: 8,
    padding: [6, 10, 8],
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  title: string,
  items: Array<PaymentProps>,
  showCategories: boolean,
  // Styles
  paymentClassName?: string,
  titleClassName?: string,
|}

const PaymentBlock = ({
  classes,
  className,
  items,
  paymentClassName,
  showCategories,
  title,
  titleClassName,
}: Props) => (
  <div className={cx(classes.root, className)}>
    <div className={cx(classes.title, titleClassName)}>{title}</div>
    {R.map(
      ({ id, ...payment }) => (
        <Payment
          className={paymentClassName}
          showCategory={showCategories}
          key={id}
          {...payment}
        />
      ),
      items
    )}
  </div>
)

export default injectStyles(styles)(PaymentBlock)
