import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    background: props =>
      props.transparent ? 'transparent' : 'rgba(0,0,0,0.2)',
  },
}

const Backdrop = ({
  classes,
  className,
  theme,
  transparent,
  children,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    {children}
  </div>
)

export default injectStyles(styles)(Backdrop)
