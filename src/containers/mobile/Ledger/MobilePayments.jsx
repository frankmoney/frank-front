// @flow strict-local
import * as React from 'react'
import Payments, { type PaymentsProps } from 'containers/widgets/Payments'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  block: {
    borderRadius: 'unset',
  },
  payment: {
    margin: [0, 20],
  },
}

type Props = {|
  ...InjectStylesProps,
  ...PaymentsProps,
|}

const MobilePayments = ({ classes, ...props }: Props) => (
  <Payments
    blockTitleClassName={classes.block}
    paymentClassName={classes.payment}
    {...props}
  />
)

export default injectStyles(styles)(MobilePayments)
