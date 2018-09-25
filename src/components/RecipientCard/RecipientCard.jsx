import React from 'react'
import cx from 'classnames'
import { format } from 'date-fns'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import CategoryList from 'components/CategoryList'
import CurrencyDelta from 'components/CurrencyDelta'
import TextWithEditableToggle from 'components/TextWithEditableToggle'
import { limitCategoriesTo } from 'data/models/categories'
import styles from './RecipientCard.jss'

const formatDate = date => format(date, 'MMM D, YYYY')

const RecipientCard = ({
  classes,
  className,
  name,
  paymentCount,
  lastPaymentDate,
  revenue,
  spending,
  categories,
  onEditName,
}) => (
  <Paper className={cx(classes.paper, className)}>
    <div className={classes.leftColumn}>
      <TextWithEditableToggle
        className={classes.name}
        value={name}
        onChange={onEditName}
      />
      <div className={classes.stats}>
        {spending !== 0 && (
          <div className={classes.statsColumn}>
            <div className={classes.statsLabel}>Spending</div>
            <CurrencyDelta className={classes.totalSum} value={spending} />
          </div>
        )}
        {revenue !== 0 && (
          <div className={classes.statsColumn}>
            <div className={classes.statsLabel}>Income</div>
            <CurrencyDelta className={classes.totalSum} value={revenue} />
          </div>
        )}
        <div className={classes.statsColumn}>
          <div className={classes.statsLabel}>Payments</div>
          {paymentCount}
        </div>
      </div>
    </div>
    <div className={classes.rightColumn}>
      <CategoryList
        data={limitCategoriesTo(5)(categories)}
        className={classes.list}
        itemClassName={classes.listItem}
        itemIconClassName={classes.listItemIcon}
        nameClassName={classes.listItemName}
        valueClassName={classes.listItemValue}
      />
      <div className={classes.lastDate}>
        <span className={classes.lastDateLabel}>Last payment</span>{' '}
        {formatDate(lastPaymentDate)}
      </div>
    </div>
  </Paper>
)

export default injectStyles(styles)(RecipientCard)
