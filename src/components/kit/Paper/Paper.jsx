// @flow strict
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

type PaperType =
  | 'card'
  | 'list'
  | 'modal'
  | 'tooltip'
  | 'menu'
  | 'drawer'
  | 'popover'

export type PaperProps = {|
  type: PaperType,
  disableOutline?: boolean,
|}

type Props = {|
  ...PaperProps,
  ...InjectStylesProps,
  //
  children?: React.Node,
|}

const lightBorder = '0px 0px 0px 1px rgba(0, 0, 0, 0.02)'
const border = '0px 0px 0px 1px rgba(0, 0, 0, 0.1)'

const styles = {
  root: {
    background: '#fff',
    borderRadius: 8,
    overflow: props => (props.disableOverflow ? 'initial' : 'auto'),
    outline: props => (props.disableOutline ? 'none' : 'initial'),
  },
  card: {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.07)',
  },
  tooltip: {
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.1), ${lightBorder}`,
  },
  dropdown: {
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.1), ${lightBorder}`,
  },
  arrowDropdown: {
    boxShadow: `0px 5px 10px rgba(0, 0, 0, 0.15), ${border}`,
  },
  modal: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  },
  drawer: {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    borderRadius: 0,
  },
  // Category list: rarely used!
  list: {
    boxShadow: `0px 2px 10px rgba(0, 0, 0, 0.05), ${border}`,
  },
}

const Paper = ({
  children,
  classes,
  className,
  type,
  // omit
  disableOutline,
  disableOverflow,
  ...otherProps
}: Props) => (
  <div className={cx(classes.root, classes[type], className)} {...otherProps}>
    {children}
  </div>
)

Paper.defaultProps = {
  type: 'card',
}

export default injectStyles(styles)(Paper)
