// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { BigButton } from 'components/kit/Button'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import VerifiedByFrank from './Verified'
import ManageButton from './ManageButton'
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
}: Props) => (
  <>
    {payments && payments.length ? (
      <div className={cx(classes.container, className)}>
        <div className={classes.header}>
          <div className={classes.title}>Attached payments</div>
          {readOnly ? <VerifiedByFrank /> : <ManageButton onClick={onEdit} />}
        </div>
        <List payments={payments} className={classes.list} />
      </div>
    ) : (
      <BigButton label="Add payments" onClick={onEdit} />
    )}
  </>
)

export default injectStyles(styles)(StoryPayments)
