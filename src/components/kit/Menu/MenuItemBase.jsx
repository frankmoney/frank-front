// @flow
import * as React from 'react'
import cx from 'classnames'
import Color from 'color-js'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

export type MenuItemBaseProps = {|
  active?: boolean,
  color?: string,
  noAnimation?: boolean,
  selected?: boolean,
|}

type Props = {|
  ...MenuItemBaseProps,
  ...InjectStylesProps,
|}

const getActiveBackgroundColor = ({ color }) =>
  color ? Color('#fff').blend(Color(color), 0.06) : '#f2f2f4' // rgba(37, 43, 67, 0.04)

export const MENU_ITEM_HEIGHT = 50

const styles = theme => ({
  root: {
    height: MENU_ITEM_HEIGHT,
    padding: [0, 15],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'transparent',
    transition: props =>
      props.noAnimation ? 'none' : theme.transition('background-color'),
    color: props => props.color,
    outline: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  selected: {
    cursor: 'default',
  },
  active: {
    background: getActiveBackgroundColor,
  },
})

const MenuItemBase = ({
  classes,
  className,
  selected,
  active,
  color,
  children,
  noAnimation,
  ...otherProps
}: Props) => (
  <div
    className={cx(
      classes.root,
      selected && classes.selected,
      active && classes.active,
      className
    )}
    data-active-color={getActiveBackgroundColor({ color })}
    {...otherProps}
  >
    {children}
  </div>
)

MenuItemBase.defaultProps = {
  color: '#252B43',
  noAnimation: false,
}

export default injectStyles(styles)(MenuItemBase)
