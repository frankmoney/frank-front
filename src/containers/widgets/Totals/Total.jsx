// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    flexGrow: 1,
    color: '#BEBFC7',
    width: '33%',
    justifyContent: 'space-between',
  },
  label: {
    ...theme.fontRegular(16, 28),
  },
  value: {
    ...theme.fontRegular(18, 26),
  },
  digits: {
    color: '#20284A',
    marginLeft: 4,
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  label: string,
  value: number,
|}

const format = x => Math.round(x).toLocaleString('en-US')

const Total = ({ className, classes, label, value }: Props) => (
  <div className={cx(classes.root, className)}>
    <span className={classes.label}>{label}</span>
    <span className={classes.value}>
      $<span className={classes.digits}>{format(value)}</span>
    </span>
  </div>
)

export default injectStyles(styles)(Total)
