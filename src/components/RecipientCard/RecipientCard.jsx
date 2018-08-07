import React from 'react'
import cx from 'classnames'
import { format } from 'date-fns'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import CategoryList from 'components/CategoryList'
import CurrencyDelta from 'components/CurrencyDelta'
import CurrencyProvider from 'components/CurrencyProvider'
import TextWithEditableToggle from 'components/TextWithEditableToggle'
import styles from './RecipientCard.jss'

const formatDate = date => format(date, 'MMM d, YYYY')

const RecipientCard = ({
  classes,
  className,
  name,
  paymentsCount,
  lastPaymentDate,
  currencyCode,
  totalIncome,
  totalSpending,
  categories,
}) => (
  <Paper className={cx(classes.paper, className)}>
    <div className={classes.leftColumn}>
      <TextWithEditableToggle className={classes.name} value={name} />
      <div className={classes.stats}>
        {totalSpending && (
          <div className={classes.statsColumn}>
            <div className={classes.statsLabel}>Spending</div>
            <CurrencyProvider code={currencyCode}>
              <CurrencyDelta
                className={classes.totalSum}
                value={totalSpending}
              />
            </CurrencyProvider>
          </div>
        )}
        {totalIncome && (
          <div className={classes.statsColumn}>
            <div className={classes.statsLabel}>Income</div>
            <CurrencyProvider code={currencyCode}>
              <CurrencyDelta className={classes.totalSum} value={totalIncome} />
            </CurrencyProvider>
          </div>
        )}
        <div className={classes.statsColumn}>
          <div className={classes.statsLabel}>Payments</div>
          {paymentsCount}
        </div>
      </div>
    </div>
    <div className={classes.rightColumn}>
      <CategoryList
        categories={categories}
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
