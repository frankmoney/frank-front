// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Total from './Total'

const styles = {
  root: {
    display: 'flex',
    flexShrink: 0,
  },
  separators: {
    borderLeft: '1px solid #EFF0F2',
    borderRight: '1px solid #EFF0F2',
  },
}

export type TotalsProps = {|
  income: number,
  spending: number,
|}

type Props = {|
  ...InjectStylesProps,
  ...TotalsProps,
  //
  itemClassName?: string,
|}

const Totals = ({
  classes,
  className,
  income,
  itemClassName,
  spending,
}: Props) => {
  const total = income - spending

  return (
    <div className={cx(classes.root, className)}>
      <Total label="Income" value={income} className={itemClassName} />
      <Total
        label="Spending"
        value={spending}
        className={cx(classes.separators, itemClassName)}
      />
      <Total label="Total" value={total} className={itemClassName} />
    </div>
  )
}

export default injectStyles(styles)(Totals)
