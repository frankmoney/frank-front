// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    '& > *[role="button"]': {
      width: '100%',
      flexGrow: 1,
      '&:not(:last-child)': {
        marginRight: 20,
      },
    },
  },
}

const DialogButtons = ({ classes, className, ...otherProps }) => (
  <div className={cx(classes.root, className)} {...otherProps} />
)

export default injectStyles(styles)(DialogButtons)
