import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    cursor: 'pointer',
    color: 'rgba(37, 43, 67, 0.2)',
    transition: 'color linear 0.1s',
    '&:hover': {
      color: '#000',
    },
  },
}

const DrawerHeadButton = ({
  theme,
  classes,
  className,
  children,
  ...otherProps
}) =>
  React.cloneElement(React.Children.only(children), {
    className: cx(classes.root, className),
    ...otherProps,
  })

export default injectStyles(styles)(DrawerHeadButton)
