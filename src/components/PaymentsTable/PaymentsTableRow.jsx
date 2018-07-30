import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { TableCell, TableRow } from '@frankmoney/components'
import { CheckCircle } from 'material-ui-icons'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'
import HighlightText from 'components/HighlightText'

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
    width: props => props.grid.fixed.getColumnSpanWidth(4),
    marginRight: props => props.grid.fixed.gutterSize,
  },
  cellRight: {
    width: props => props.grid.fixed.getColumnSpanWidth(2),
  },
  title: {
    ...theme.fontRegular(20, 30),
    color: '#20284A',
  },
  description: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',
  },
  emptyTitle: {
    opacity: 0.2,
  },
  client: {
    marginRight: 20,
    ...theme.fontMedium(16),
    color: '#20284A',
  },
  category: {
    ...theme.fontMedium(16),
  },
  sum: {
    ...theme.fontRegular(20, 30),
    textAlign: 'right',
    display: 'block',
  },
  rightDescription: {
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
  data: { description: title, recipientName, delta, category },
  searchText,
  // omit
  grid,
  theme,
  ...rowProps
}) => (
  <TableRow className={cx(classes.root, className)} {...rowProps}>
    <TableCell name="description" className={classes.cellLeft}>
      <div className={cx(classes.title, !title && classes.emptyTitle)}>
        {title ? (
          <HighlightText text={title} textPattern={searchText} />
        ) : (
          'Add description...'
        )}
      </div>
      <div className={classes.description}>
        {recipientName && <div className={classes.client}>{recipientName}</div>}
        {category && (
          <CategoryLabel
            className={classes.category}
            size={12}
            color={category.color}
            name={category.name}
          />
        )}
      </div>
    </TableCell>
    <TableCell name="sum" className={classes.cellRight}>
      <CurrencyDelta className={classes.sum} value={delta} />
      <div className={classes.rightDescription}>
        <div className={classes.date}>April 12, 12:42PM</div>
        <CheckCircle className={classes.checkIcon} />
      </div>
    </TableCell>
  </TableRow>
)

export default injectStyles(styles, { grid: true })(PaymentsTableRow)
