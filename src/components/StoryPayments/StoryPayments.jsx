import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { GiantButton } from '@frankmoney/components'
import { Add as AddIcon } from 'material-ui-icons'
import VerifiedByFrank from './Verified'
import ManageButton from './ManageButton'
import List from './PaymentsList'
import styles from './StoryPayments.jss'

const StoryPayments = ({ classes, className, payments, readOnly, onEdit }) => (
  <>
    {payments && payments.length ? (
      <div className={cx(classes.container, className)}>
        <div className={classes.header}>
          <div className={classes.title}>Attached payments</div>
          {readOnly ? <VerifiedByFrank /> : <ManageButton onClick={onEdit} />}
        </div>
        <List
          currencyCode={'USD'}
          payments={payments}
          className={classes.list}
        />
      </div>
    ) : (
      <GiantButton label="Add payments" icon={AddIcon} onClick={onEdit} />
    )}
  </>
)

export default injectStyles(styles)(StoryPayments)
