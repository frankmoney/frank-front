// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

export type BackdropProps = {|
  transparent?: boolean,
|}

type Props = {|
  ...InjectStylesProps,
  ...BackdropProps,
  //
  children?: React.Node,
|}

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
}: Props) => (
  <div
    aria-hidden="true"
    className={cx(classes.root, 'ui-fixed', className)}
    {...otherProps}
  >
    {children}
  </div>
)

export default injectStyles(styles)(Backdrop)
