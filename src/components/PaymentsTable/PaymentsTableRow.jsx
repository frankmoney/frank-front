import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { TableCell, TableRow } from '@frankmoney/components'
import { CheckCircle } from 'material-ui-icons'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'
import HighlightText from 'components/HighlightText'
import { formatFullDate } from 'utils/dates'

const CELL_HEIGHT = 110

const styles = theme => ({
  root: {
    color: 'inherit',
    height: CELL_HEIGHT,
    maxHeight: CELL_HEIGHT,
    minHeight: CELL_HEIGHT,
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
    color: '#20284A',
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
    color: '#20284A',
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
  icon: {
    marginLeft: 10,
    width: 22,
    height: 22,
  },
  checkIcon: {
    composes: '$icon',
    color: '#21CB61',
  },
})

const PaymentsTableRow = ({
  classes,
  className,
  data: { description, peerName, amount, category, postedOn, published },
  // omit
  grid,
  theme,
  ...rowProps
}) => (
  <TableRow className={cx(classes.root, className)} {...rowProps}>
    <TableCell name="description" className={classes.cellLeft}>
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
        {peerName && (
          <div className={classes.client}>
            {' '}
            <HighlightText text={peerName} />
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
      <CurrencyDelta className={classes.sum} value={amount} />
      <div className={classes.icons}>
        <div className={classes.date}>{formatFullDate(postedOn)}</div>
        {published && <CheckCircle className={classes.checkIcon} />}
      </div>
    </TableCell>
  </TableRow>
)

export default injectStyles(styles, { grid: true })(PaymentsTableRow)
