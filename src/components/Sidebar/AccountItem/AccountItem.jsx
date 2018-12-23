// @flow
import * as React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { ArrowDropDown as ArrowIcon } from 'material-ui-icons'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import styles from './AccountItem.jss'

type Props = {|
  ...InjectStylesProps,
  //
  compact: boolean,
  icon: React.Element<any>,
  label: React.Node,
  compactHref: string,
  onClick?: () => void,
  renderAccountMenuItems: () => Array<React.Node>,
|}

const AccountItem = ({
  classes,
  className,
  compact,
  compactHref,
  icon,
  label,
  onClick,
  renderAccountMenuItems,
}: Props) => {
  const accountMenuItems = renderAccountMenuItems()

  return compact ? (
    <Link
      to={compactHref}
      style={{ textDecoration: 'none' }}
      className={cx(classes.accountItem, className)}
      onClick={onClick}
    >
      <div className={classes.labelCompact}>{label}</div>
      {React.cloneElement(icon, { className: classes.icon })}
    </Link>
  ) : (
    <div className={cx(classes.accountItem, className)} onClick={onClick}>
      <div className={classes.labelBig}>{label}</div>
      {accountMenuItems &&
        (React.isValidElement(accountMenuItems) ||
          Boolean(accountMenuItems.length)) && (
          <div className={classes.menuSecondary}>{accountMenuItems}</div>
        )}
    </div>
  )
}

AccountItem.defaultProps = {
  label: 'Demo account',
  compact: true,
  icon: <ArrowIcon />,
  renderAccountMenuItems: () => null,
}

export default compose(injectStyles(styles))(AccountItem)
