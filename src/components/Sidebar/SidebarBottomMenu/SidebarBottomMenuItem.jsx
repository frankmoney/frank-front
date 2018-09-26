// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Link } from 'react-router-dom'
import styles from './SidebarBottomMenuItem.jss'

type Props = {
  classes: {},
  type?: string,
  name?: string,
  text: string,
  url?: string,
  href?: string,
  onClick: Function,
}

const SideBarBottomMenuItem = ({
  classes,
  type,
  name,
  text,
  url,
  href,
  onClick,
}: Props) => {
  // eslint-disable-next-line no-nested-ternary
  const RootElement = url ? Link : href ? 'a' : 'div'
  return (
    <RootElement
      key={name || text}
      to={url}
      href={href}
      className={cx(
        classes.bottomMenuItem,
        type === 'common' && classes.bottomMenuItemCommon,
        type === 'danger' && classes.bottomMenuItemDanger,
        type === 'primary' && classes.bottomMenuItemPrimary
      )}
      onClick={onClick}
    >
      <div className={classes.bottomMenuItemText}>{text}</div>
    </RootElement>
  )
}

export default injectStyles(styles)(SideBarBottomMenuItem)
