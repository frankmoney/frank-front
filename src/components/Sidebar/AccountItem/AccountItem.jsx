// @flow
import * as React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { ArrowDropDown as ArrowIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import styles from './AccountItem.jss'

type Props = {
  label: React.Node,
  renderAccountMenuItems: () => Array<React.Node>,
  classes: Object,
  className: ?string,
  compact: boolean,
  onClick: ?() => void,
}

const AccountItem = ({
  label,
  compact,
  renderAccountMenuItems,
  classes,
  className,
  onClick,
}: Props) => {
  const accountMenuItems = renderAccountMenuItems()

  return (
    <div className={cx(classes.accountItem, className)} onClick={onClick}>
      {compact ? (
        <>
          <div className={classes.labelCompact}>{label}</div>
          <ArrowIcon className={classes.icon} />
        </>
      ) : (
        <>
          <div className={classes.labelBig}>{label}</div>
          {accountMenuItems &&
            (React.isValidElement(accountMenuItems) ||
              Boolean(accountMenuItems.length)) && (
              <div className={classes.menuSecondary}>{accountMenuItems}</div>
            )}
        </>
      )}
    </div>
  )
}

AccountItem.defaultProps = {
  label: 'Demo account',
  compact: true,
}

export default compose(injectStyles(styles))(AccountItem)
