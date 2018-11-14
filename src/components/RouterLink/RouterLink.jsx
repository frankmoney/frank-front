// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  root: { textDecoration: 'none' },
}

type Props = {|
  ...InjectStylesProps,
  //
  children: React.Node,
  to: string,
|}

const RouterLink = ({ children, classes, className, to, ...props }: Props) => (
  <Link className={cx(classes.root, className)} to={to} {...props}>
    {children}
  </Link>
)

export default injectStyles(styles)(RouterLink)
