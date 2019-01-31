// @flow
import React from 'react'
import cx from 'classnames'
import { format } from 'date-fns'
import CurrencyValue from 'components/CurrencyValue'
import PeerCategoryList from 'components/PeerCategoryList'
import TextWithEditableToggle from 'components/TextWithEditableToggle'
import Paper from 'components/kit/Paper'
import { injectStyles } from 'utils/styles'
import styles from './RecipientCard.jss'

const formatDate = date => format(date, 'MMM D, YYYY')

const RecipientCard = ({
  categories,
  classes,
  className,
  lastPaymentDate,
  name,
  onEditName,
  paymentCount,
  revenue,
  spending,
}) => (
  <Paper className={cx(classes.paper, className)} disableOverflow>
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
            <CurrencyValue className={classes.totalSum} value={spending} />
          </div>
        )}
        {revenue !== 0 && (
          <div className={classes.statsColumn}>
            <div className={classes.statsLabel}>Income</div>
            <CurrencyValue className={classes.totalSum} value={revenue} />
          </div>
        )}
        <div className={classes.statsColumn}>
          <div className={classes.statsLabel}>Payments</div>
          {paymentCount}
        </div>
      </div>
    </div>
    <div className={classes.rightColumn}>
      <PeerCategoryList
        totalSum={categories.reduce((a, b) => a + Math.abs(b.sum), 0)}
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
