// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    flexGrow: 1,
    color: '#BEBFC7',
    // TODO: better pixel?
    '&:not(:first-child)': {
      borderLeft: '1px solid #EFF0F2',
      paddingLeft: 15,
      marginLeft: 9,
    },
  },
  value: {
    fontSize: 18,
  },
  digits: {
    color: '#20284A',
    marginLeft: 4,
  },
}

type Props = {
  label: string,
  value: number,
  // Styles
  classes: Object,
  className: ?string,
}

const format = x => Math.round(x).toLocaleString('en-US')

const Total = ({ className, classes, label, value }: Props) => (
  <div className={cx(classes.root, className)}>
    {label}
    <span className={classes.value}>
      $<span className={classes.digits}>{format(value)}</span>
    </span>
  </div>
)

export default injectStyles(styles)(Total)
