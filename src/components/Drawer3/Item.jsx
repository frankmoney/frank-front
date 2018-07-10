import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { format } from 'date-fns'
import CategoryLabel from 'components/CategoryLabel'

const styles = theme => ({
  root: {
    display: 'table',
    height: 55,
    marginLeft: -30,
    marginRight: -30,
    paddingLeft: 30,
    paddingRight: 30,
    cursor: 'pointer',
    '&:not(:first-child)': {
      borderTop: '1px solid rgba(37, 43, 67, 0.08)',
    },
  },
  green: {},
  sign: {
    display: 'table-cell',
    width: 13,
    minWidth: 13,
    maxWidth: 13,
    textAlign: 'center',
    color: 'rgba(37, 43, 67, 0.3)',
    ...theme.fontRegular(16, 55),
  },
  unit: {
    display: 'table-cell',
    width: 13,
    minWidth: 13,
    maxWidth: 13,
    color: 'rgba(37, 43, 67, 0.3)',
    ...theme.fontRegular(16, 55),
  },
  value: {
    display: 'table-cell',
    width: 110,
    minWidth: 110,
    maxWidth: 110,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    paddingLeft: 5,
    ...theme.fontMedium(16, 55),
    '&$green': {
      color: '#2fce6b',
    },
  },
  title: {
    display: 'table-cell',
    width: 154,
    minWidth: 154,
    maxWidth: 154,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    ...theme.fontMedium(16, 55),
  },
  category: {
    display: 'table-cell',
    width: 180,
    minWidth: 180,
    maxWidth: 180,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    paddingLeft: 10,
    ...theme.fontMedium(16, 55),
  },
  date: {
    display: 'table-cell',
    width: 70,
    minWidth: 70,
    maxWidth: 70,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: 'rgba(37, 43, 67, 0.3)',
    textAlign: 'right',
    paddingLeft: 10,
    ...theme.fontRegular(16, 55),
  },
})

const formatValue = value => value.substr(1)

const formatDate = date => format(date, 'MMM dd')

const Item = ({
  classes,
  value,
  green,
  title,
  categoryName,
  categoryColor,
  date,
}) => (
  <div className={classes.root}>
    <div className={classes.sign}>{value[0] === '-' ? '-' : '+'}</div>
    <div className={classes.unit}>$</div>
    <div className={cx(classes.value, green && classes.green)}>
      {formatValue(value)}
    </div>
    <div className={classes.title}>{title}</div>
    <div className={classes.category}>
      <CategoryLabel name={categoryName} color={categoryColor} />
    </div>
    <div className={classes.date}>{formatDate(date)}</div>
  </div>
)

export default injectStyles(styles)(Item)
