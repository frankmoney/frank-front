import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { compose } from 'recompose'
import { Currency } from '@frankmoney/components'
import reconnect from 'utils/reconnect'
import {
  descriptionSelector,
  nameSelector,
  revenueSelector,
  spendingSelector,
  totalSelector,
} from '../selectors'
import styles from './LedgerStats.jss'

const LedgerStats = ({
  classes,
  className,
  name,
  description,
  revenue,
  spending,
  total,
}) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.title}>{name}</div>
    <div className={classes.stats}>
      {revenue !== 0 && (
        <div className={classes.stat}>
          <div className={classes.statLabel}>Income</div>
          <Currency className={classes.statSum} value={revenue} />
        </div>
      )}
      {spending !== 0 && (
        <div className={classes.stat}>
          <div className={classes.statLabel}>Spending</div>
          <Currency className={classes.statSum} value={spending} />
        </div>
      )}
      <div className={classes.stat}>
        <div className={classes.statLabel}>Balance</div>
        <Currency className={classes.statSum} value={total} />
      </div>
    </div>
    {description && <div className={classes.description}>{description}</div>}
  </div>
)

export default compose(
  reconnect({
    description: descriptionSelector,
    name: nameSelector,
    revenue: revenueSelector,
    spending: spendingSelector,
    total: totalSelector,
  }),
  injectStyles(styles)
)(LedgerStats)
