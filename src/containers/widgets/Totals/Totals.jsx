// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Total from './Total'

const styles = {
  root: {
    display: 'flex',
    flexShrink: 0,
    margin: [3, 0, 22],
  },
}

export type TotalsProps = {|
  income: number,
  spending: number,
|}

type Props = {|
  ...InjectStylesProps,
  ...TotalsProps,
|}

const Totals = ({ className, classes, income, spending }: Props) => {
  const total = income - spending

  return (
    <div className={cx(classes.root, className)}>
      <Total label="Income" value={income} />
      <Total label="Spending" value={spending} />
      <Total label="Total" value={total} />
    </div>
  )
}

Totals.defaultProps = {
  // FIXME: placeholder
  income: 229620,
  spending: 197568,
}

export default injectStyles(styles)(Totals)
