// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { TableCell, TableRow } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'
import HighlightText from 'components/HighlightText'
import { formatShortDate } from 'utils/dates'
import PaymentStatus from 'components/admin/PaymentStatus'

const FULL_CELL_HEIGHT = 110

const styles = theme => ({
  root: {
    color: theme.colors.black,
    textDecoration: 'none',
    height: FULL_CELL_HEIGHT,
    maxHeight: FULL_CELL_HEIGHT,
    minHeight: FULL_CELL_HEIGHT,
    padding: [21, 0],
  },
  cellLeft: {
    width: '70%',
    marginRight: 20,
  },
  cellRight: {
    width: '30%',
  },
  description: {
    ...theme.fontRegular(20, 30),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  emptyDescription: {
    color: 'rgba(32, 40, 74, 0.5)',
    '$editable &': {
      color: 'rgba(32, 40, 74, 0.3)',
    },
    '$editable:hover &': {
      color: 'rgba(32, 40, 74, 0.4)',
    },
  },
  pendingDescription: {
    color: 'rgba(32, 40, 74, 0.5)',
  },
  info: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',
  },
  client: {
    marginRight: 20,
    ...theme.fontMedium(16),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  category: {
    ...theme.fontMedium(16),
    whiteSpace: 'nowrap',
  },
  categoryIcon: {
    height: 12,
    marginBottom: -1,
    width: 12,
  },
  sum: {
    ...theme.fontRegular(20, 30),
    textAlign: 'right',
    display: 'block',
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  date: {
    ...theme.fontRegular(16, 26),
    color: 'rgba(37, 43, 67, 0.3)',
  },
  status: {
    marginLeft: 10,
  },
  unverified: {
    '& $description:not($emptyDescription):not($pendingDescription), & $category, & $client': {
      opacity: 0.5,
    },
  },
  editable: {},
})

const PaymentsTableRow = ({
  classes,
  className,
  data: { verified, description, peer, amount, category, postedOn, pending },
  canEdit,
  ...rowProps
}) => (
  <TableRow
    className={cx(
      classes.root,
      {
        [classes.unverified]: !verified,
        [classes.editable]: canEdit,
      },
      className
    )}
    hoverBackgroundColor="#f6f7f7"
    {...rowProps}
  >
    <TableCell name="description" className={classes.cellLeft}>
      <div
        className={cx(classes.description, {
          [classes.emptyDescription]: !pending && !description,
          [classes.pendingDescription]: !!pending,
        })}
      >
        {pending ? (
          'Pending'
        ) : description ? (
          <HighlightText text={description} />
        ) : canEdit ? (
          'Add description...'
        ) : (
          'No description'
        )}
      </div>
      <div className={classes.info}>
        {peer && (
          <div className={classes.client}>
            {' '}
            <HighlightText text={peer.name} />
          </div>
        )}
        {category && (
          <CategoryLabel
            className={classes.category}
            iconClassName={classes.categoryIcon}
            color={category.color}
            name={category.name}
          />
        )}
      </div>
    </TableCell>
    <TableCell name="sum" className={classes.cellRight}>
      <CurrencyDelta className={classes.sum} value={amount} faint={pending} />
      <div className={classes.icons}>
        <div className={classes.date}>{formatShortDate(postedOn)}</div>
        {canEdit && (
          <PaymentStatus
            className={classes.status}
            verified={verified}
            pending={pending}
          />
        )}
      </div>
    </TableCell>
  </TableRow>
)

export default injectStyles(styles, { grid: true })(PaymentsTableRow)
