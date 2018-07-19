import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = {
  root: {
    padding: [16, 30],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    boxShadow: '0px -1px 3px rgba(0, 0, 0, 0.1)',
  },
}

const Footer = ({ classes, className, ...otherProps }) => (
  <div className={cx(className, classes.root)} {...otherProps} />
)

export default injectStyles(styles)(Footer)
