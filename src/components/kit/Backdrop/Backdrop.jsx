// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

type Props = {
  transparent?: boolean,
}

export type BackdropProps = Props

const styles = {
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    background: props =>
      props.transparent ? 'transparent' : 'rgba(0,0,0,0.2)',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none',
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
  <div
    aria-hidden="true"
    className={cx(classes.root, className)}
    {...otherProps}
  >
    {children}
  </div>
)

export default injectStyles(styles)(Backdrop)
