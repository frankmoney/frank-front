// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { createRouteUrl } from '@frankmoney/utils'
import { TableCell, TableRow } from '@frankmoney/components'
import CurrencyValue from 'components/CurrencyValue'
import HighlightText from 'components/HighlightText'
import PeerCategoryList from 'components/PeerCategoryList'
import { ROUTES } from 'const'
import { injectStyles } from 'utils/styles'

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
    width: 520,
  },
  rightColumn: {
    position: 'relative',
    width: 270,
  },
  name: {
    ...theme.fontMedium(20, 26),
    paddingBottom: 68,
  },
  infos: {
    position: 'absolute',
    bottom: 27,
  },
  info: {
    display: 'inline-block',
    width: 125,
    marginRight: 15,
    borderRight: '1px solid rgba(37, 43, 67, 0.09)',
  },
  paymentCountInfo: {
    display: 'inline-block',
  },
  infoLabel: {
    paddingBottom: 8,
    ...theme.fontRegular(16),
    color: 'rgba(37, 43, 67, 0.3)',
  },
  infoValue: {
    ...theme.fontRegular(18),
  },
  categories: {
    position: 'absolute',
    bottom: 0,
    height: 26,
    ...theme.fontMedium(16, 26),
  },
})

const RecipientRow = ({
  classes,
  accountId,
  data: { id, name, paymentCount, total, revenue, spending, categories },
  searchText,
}) => (
  <TableRow
    className={classes.root}
    hoverBackgroundColor="#F8F9F9"
    component={Link}
    to={createRouteUrl(ROUTES.account.directory.recipient, { accountId, id })}
  >
    <TableCell name="left" className={classes.leftColumn}>
      <div className={classes.name}>
        <HighlightText text={name} textPattern={searchText} />
      </div>
    </TableCell>
    <TableCell name="right" className={classes.rightColumn}>
      <PeerCategoryList totalSum={total} categories={categories} />
    </TableCell>

    <div className={classes.infos}>
      {spending !== 0 && (
        <div className={classes.info}>
          <div className={classes.infoLabel}>Spending</div>
          <CurrencyValue className={classes.infoValue} value={spending} />
        </div>
      )}

      {revenue !== 0 && (
        <div className={classes.info}>
          <div className={classes.infoLabel}>Income</div>
          <CurrencyValue className={classes.infoValue} value={revenue} />
        </div>
      )}

      <div className={classes.paymentCountInfo}>
        <div className={classes.infoLabel}>Payments</div>
        <div className={classes.infoValue}>{paymentCount}</div>
      </div>
    </div>
  </TableRow>
)

export default injectStyles(styles)(RecipientRow)
