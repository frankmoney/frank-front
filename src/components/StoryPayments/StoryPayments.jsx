// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Button from 'components/kit/Button'
import VerifiedByFrank from './Verified'
import List from './PaymentsList'
import styles from './StoryPayments.jss'

export type PaymentList = Array<Object> // flowlint-line unclear-type:warn

type Props = {|
  ...InjectStylesProps,
  //
  onEdit?: () => void,
  payments: PaymentList,
  readOnly?: boolean,
|}

const StoryPayments = ({
  classes,
  className,
  onEdit,
  payments,
  readOnly,
  onRemovePayment,
}: Props) => (
  <div
    className={cx(
      classes.container,
      {
        [classes.empty]: !payments || !payments.length,
      },
      className
    )}
  >
    <div className={classes.header}>
      <div className={classes.title}>Attached payments</div>
      {readOnly ? (
        <VerifiedByFrank />
      ) : (
        <Button
          compactHeight
          color="blue"
          label="Add payments"
          onClick={() => onEdit()}
        />
      )}
    </div>
    {payments &&
      !!payments.length && (
        <List
          payments={payments}
          className={classes.list}
          onRemoveItem={onRemovePayment}
        />
      )}
  </div>
)

export default injectStyles(styles)(StoryPayments)
