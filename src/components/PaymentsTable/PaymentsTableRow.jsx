// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { TableCell, TableRow } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'
import HighlightText from 'components/HighlightText'
import { formatFullDate } from 'utils/dates'
import PaymentStatus from 'components/admin/PaymentStatus'

const SHORT_CELL_HEIGHT = 80

const FULL_CELL_HEIGHT = 110

const styles = theme => ({
  root: {
    color: theme.colors.black,
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#F6F7F7',
    },
  },
  tall: {
    height: FULL_CELL_HEIGHT,
    maxHeight: FULL_CELL_HEIGHT,
    minHeight: FULL_CELL_HEIGHT,
    padding: [21, 0],
  },
  short: {
    height: SHORT_CELL_HEIGHT,
    maxHeight: SHORT_CELL_HEIGHT,
    minHeight: SHORT_CELL_HEIGHT,
    padding: [25, 0],
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
    opacity: 0.2,
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
    color: 'rgba(0,0,0,0.2)',
    opacity: 0,
    transition: theme.transition('opacity'),
    '$root:hover &': {
      opacity: 1,
    },
  },
  verified: {
    marginLeft: 10,
  },
})

const PaymentsTableRow = ({
  classes,
  className,
  data: { description, peer, amount, category, postedOn, published, pending },
  tall,
  short,
  canEdit,
  canView,
  ...rowProps
}) => (
  <TableRow
    className={cx(
      classes.root,
      {
        [classes.tall]: tall,
        [classes.short]: short,
      },
      className
    )}
    {...rowProps}
  >
    <TableCell name="description" className={classes.cellLeft}>
      {canEdit || canView ? (
        <>
          <div
            className={cx(
              classes.description,
              !description && classes.emptyDescription
            )}
          >
            {description ? (
              <HighlightText text={description} />
            ) : (
              'Add description...'
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
        </>
      ) : (
        <div
          className={cx(
            classes.description,
            !description && classes.emptyDescription
          )}
        >
          No description
        </div>
      )}
    </TableCell>
    <TableCell name="sum" className={classes.cellRight}>
      <CurrencyDelta className={classes.sum} value={amount} />
      {canView && (
        <div className={classes.icons}>
          <div className={classes.date}>{formatFullDate(postedOn)}</div>
          {canEdit && (
            <PaymentStatus
              className={classes.verified}
              verified={published}
              pending={pending}
            />
          )}
        </div>
      )}
    </TableCell>
  </TableRow>
)

export default injectStyles(styles, { grid: true })(PaymentsTableRow)
