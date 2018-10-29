// @flow
import * as React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

type Props = {
  label: string,
  //
  children?: React.Node,
  classes: Object,
  className?: string,
}

const styles = theme => ({
  root: {
    ...theme.fontMedium(14, 25),
    background: '#484DE7',
    borderRadius: 12.5,
    color: '#fff',
    display: 'inline-block',
    height: 25,
    minWidth: 25,
    padding: [1, 7, 0, 6],
    textAlign: 'center',
  },
})

const Counter = ({ children, classes, className, label }: Props) => (
  <div className={cx(classes.root, className)}>{label || children}</div>
)

export default injectStyles(styles)(Counter)
