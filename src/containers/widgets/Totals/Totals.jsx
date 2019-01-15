// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Total from './Total'

const styles = theme => ({
  root: {
    display: 'flex',
    flexShrink: 0,
    ...theme.fontRegular(18, 26),
  },
  separators: {
    borderLeft: '1px solid #EFF0F2',
    borderRight: '1px solid #EFF0F2',
  },
  item: {},
  multiline: {
    flexWrap: 'wrap',
    '& $separators': {
      borderRight: 'none',
    },
    '& $item': {
      width: '50%',
      '&:last-child': {
        paddingLeft: 0,
        marginTop: 12,
      },
    },
  },
})

export type TotalsProps = {|
  income: number,
  spending: number,
|}

type Props = {|
  ...InjectStylesProps,
  ...TotalsProps,
  //
  itemClassName?: string,
  multiline?: boolean,
|}

const Totals = ({
  classes,
  className,
  income,
  itemClassName,
  multiline,
  spending,
}: Props) => {
  const total = income - spending

  return (
    <div
      className={cx(
        classes.root,
        { [classes.multiline]: multiline },
        className
      )}
    >
      <Total
        label="Income"
        value={income}
        className={cx(classes.item, itemClassName)}
      />
      <Total
        label="Spending"
        value={spending}
        className={cx(classes.item, classes.separators, itemClassName)}
      />
      <Total
        label="Total"
        value={total}
        className={cx(classes.item, itemClassName)}
      />
    </div>
  )
}

export default injectStyles(styles)(Totals)
