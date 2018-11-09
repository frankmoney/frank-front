import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { injectStyles } from '@frankmoney/ui'
import { createRouteUrl } from '@frankmoney/utils'
import { TableCell, TableRow } from '@frankmoney/components'
import CategoryLabel from 'components/CategoryLabel'
import CurrencyDelta from 'components/CurrencyDelta'
import CurrencyProvider from 'components/CurrencyProvider'
import ListWithOverflow from 'components/ListWithOverflow'
import HighlightText from 'components/HighlightText'
import { ROUTES } from 'const'

const styles = theme => ({
  root: {
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
    height: 'inherit',
    minHeight: 128,
    padding: [22, 29],
    '&:not(:last-child)': {
      borderBottom: '1px solid #F0F0F2',
    },
  },
  leftColumn: {
    position: 'relative',
    width: '53%',
  },
  rightColumn: {
    position: 'relative',
    width: '47%',
  },
  name: {
    ...theme.fontMedium(20, 26),
    paddingBottom: 58,
  },
  info: {
    ...theme.fontRegular(16, 24),
    position: 'absolute',
    bottom: 0,
  },
  infoLabel: {
    color: 'rgba(37, 43, 67, 0.3)',
  },
  totalSums: {
    ...theme.fontRegular(20, 26),
  },
  totalSum: {
    marginRight: 20,
  },
  categories: {
    position: 'absolute',
    bottom: 0,
    height: 26,
    ...theme.fontMedium(16, 26),
  },
})

const formatDate = date => format(date, 'MMM D')

const categoriesListComponent = injectStyles({
  icon: {
    height: 12,
    width: 12,
  },
})(({ classes, ...category }) => (
  <CategoryLabel iconClassName={classes.icon} {...category} />
))

const RecipientRow = ({
  classes,
  data: {
    id,
    name,
    paymentCount,
    lastPaymentDate,
    currencyCode,
    revenue,
    spending,
    categories,
  },
  searchText,
}) => (
  <TableRow
    className={classes.root}
    hoverBackgroundColor="#F8F9F9"
    component={Link}
    to={createRouteUrl(ROUTES.directory.recipient, { id })}
  >
    <TableCell name="left" className={classes.leftColumn}>
      <div className={classes.name}>
        <HighlightText text={name} textPattern={searchText} />
      </div>

      <div className={classes.info}>
        <div>
          <span className={classes.infoLabel}>Payments</span> {paymentCount}
        </div>
        <div>
          <span className={classes.infoLabel}>Last payment</span>{' '}
          {formatDate(lastPaymentDate)}
        </div>
      </div>
    </TableCell>
    <TableCell name="right" className={classes.rightColumn}>
      <div className={classes.totalSums}>
        {spending !== 0 && (
          <CurrencyProvider code={currencyCode}>
            <CurrencyDelta className={classes.totalSum} value={spending} />
          </CurrencyProvider>
        )}
        {revenue !== 0 && (
          <CurrencyProvider code={currencyCode}>
            <CurrencyDelta className={classes.totalSum} value={revenue} />
          </CurrencyProvider>
        )}
      </div>
      <ListWithOverflow
        className={classes.categories}
        list={categories}
        listComponent={categoriesListComponent}
        overflowComponentWidth={71}
      />
    </TableCell>
  </TableRow>
)

export default injectStyles(styles)(RecipientRow)
