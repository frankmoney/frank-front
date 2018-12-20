// @flow
import * as React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { ArrowDropDown as ArrowIcon } from 'material-ui-icons'
import { createRouteUrl } from '@frankmoney/utils'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { ROUTES } from '../../../const'
import styles from './AccountItem.jss'

type Props = {|
  ...InjectStylesProps,
  //
  compact: boolean,
  icon: React.Element<any>,
  label: React.Node,
  accountId: string,
  onClick?: () => void,
  renderAccountMenuItems: () => Array<React.Node>,
|}

const AccountItem = ({
  classes,
  className,
  compact,
  icon,
  label,
  onClick,
  accountId,
  renderAccountMenuItems,
}: Props) => {
  const accountMenuItems = renderAccountMenuItems()

  return compact ? (
    <Link
      to={createRouteUrl(ROUTES.account.idRoot, { accountId })}
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
