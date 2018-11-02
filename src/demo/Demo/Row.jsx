// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 450,
    '& > *': {
      marginRight: 20,
    },
    marginBottom: 20,
  },
  centered: {
    justifyContent: 'center',
  },
}

const Row = ({ centered, children, classes, className }) => (
  <div className={cx(classes.row, centered && classes.centered, className)}>
    {children}
  </div>
)

export default injectStyles(styles)(Row)
