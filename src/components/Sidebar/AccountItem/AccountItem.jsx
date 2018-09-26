// @flow
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { ArrowDropDown as ArrowIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import styles from './AccountItem.jss'

type Props = {
  label: Element | string,
  renderAccountMenuItems: () => Array<Element>,
  classes: {},
  className: string,
  compact: boolean,
}

const AccountItem = ({
  label,
  compact,
  renderAccountMenuItems,
  classes,
  className,
}: Props) => {
  const accountMenuItems = renderAccountMenuItems()

  return (
    <div className={cx(classes.accountItem, className)}>
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
