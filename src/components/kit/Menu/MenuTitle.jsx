import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { MENU_ITEM_HEIGHT } from './MenuItem'

export const MENU_TITLE_HEIGHT = MENU_ITEM_HEIGHT

const styles = theme => ({
  root: {
    height: MENU_TITLE_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 43, 67, 0.5)',
    ...theme.fontMedium(18),
    padding: [0, 15],
  },
})

const MenuTitle = ({ classes, className, children }) => (
  <div className={cx(classes.root, className)}>{children}</div>
)

export default injectStyles(styles)(MenuTitle)
