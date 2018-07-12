import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.07)',
    padding: [0, 10],
    position: 'relative',
    width: 850,
  },
}

const Card = ({ children, classes, className }) => (
  <div className={cx(classes.root, className)}>{children}</div>
)

export default injectStyles(styles)(Card)
