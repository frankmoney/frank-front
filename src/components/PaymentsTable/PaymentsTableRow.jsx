import React from 'react'
import cx from 'classnames'
import { TableCell, TableRow } from '@frankmoney/components'
import { injectStyles } from 'utils/styles'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'
import HighlightText from 'components/HighlightText'
import { formatFullDate } from 'utils/dates'
import PaymentVerifiedStatus from 'components/admin/PaymentStatus'

const NOT_VERIFIED_CELL_HEIGHT = 80

const FULL_CELL_HEIGHT = 110

const getCellHeight = ({ type, data: { verified } }) =>
  (type === 'public' && verified) || type === 'admin'
    ? FULL_CELL_HEIGHT
    : NOT_VERIFIED_CELL_HEIGHT

const getCellPadding = ({ type, data: { verified } }) =>
  (type === 'public' && verified) || type === 'admin' ? '21px 0' : '25px 0'

const styles = theme => ({
  root: {
    color: theme.colors.black,
    height: getCellHeight,
    maxHeight: getCellHeight,
    minHeight: getCellHeight,
    padding: getCellPadding,
    textDecoration: 'none',
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
  },
  category: {
    ...theme.fontMedium(16),
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
  data: { description, peer, amount, category, postedOn, verified, pending },
  type,
  ...rowProps
}) => (
  <TableRow className={cx(classes.root, className)} {...rowProps}>
    <TableCell name="description" className={classes.cellLeft}>
      {(type === 'public' && verified) || type === 'admin' ? (
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
      {((type === 'public' && verified) || type === 'admin') && (
        <div className={classes.icons}>
          <div className={classes.date}>{formatFullDate(postedOn)}</div>
          {type === 'admin' && (
            <PaymentVerifiedStatus
              className={classes.verified}
              verified={verified}
              pending={pending}
            />
          )}
        </div>
      )}
    </TableCell>
  </TableRow>
)

export default injectStyles(styles, { grid: true })(PaymentsTableRow)
