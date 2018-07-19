import React from 'react'
import { format } from 'date-fns'
import { injectStyles } from '@frankmoney/ui'
import { Paper } from '@frankmoney/components'
import CategoryList from 'components/CategoryList'
import CurrencyDelta from 'components/CurrencyDelta'
import CurrencyProvider from 'components/CurrencyProvider'
import styles from './RecipientCard.jss'

const formatDate = date => format(date, 'MMM d, YYYY')

const RecipientCard = ({
  classes,
  name,
  paymentsCount,
  lastPaymentDate,
  currencyCode,
  totalIncome,
  totalSpending,
  categories,
}) => (
  <Paper className={classes.paper}>
    <div className={classes.leftColumn}>
      <div className={classes.name}>{name}</div>
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
        itemIconSize={12}
        tooltipItemIconSize={12}
        className={classes.list}
        classes={{
          item: classes.listItem,
          itemName: classes.listItemName,
          itemCounter: classes.listItemCounter,
          tooltipItem: classes.listTooltipItem,
          tooltipItemName: classes.listTooltipItemName,
          tooltipItemCounter: classes.listTooltipItemCounter,
        }}
        categories={categories}
      />
      <div className={classes.lastDate}>
        <span className={classes.lastDateLabel}>Last payment</span>{' '}
        {formatDate(lastPaymentDate)}
      </div>
    </div>
  </Paper>
)

export default injectStyles(styles)(RecipientCard)
