// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

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

type OmittedProps = {|
  theme?: any, // flowlint-line unclear-type:warn
|}

export type DrawerHeaderButtonProps = {|
  children: React.Node,
|}

type Props = {|
  ...InjectStylesProps,
  ...OmittedProps,
  ...DrawerHeaderButtonProps,
|}

const DrawerHeaderButton = ({
  theme,
  classes,
  className,
  children,
  ...otherProps
}: Props) =>
  React.cloneElement(React.Children.only(children), {
    className: cx(classes.root, className),
    ...otherProps,
  })

export default injectStyles(styles)(DrawerHeaderButton)
