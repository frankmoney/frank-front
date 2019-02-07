// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { CheckCircle } from 'material-ui-icons'
import Color from 'color-js'
import SelectListBase from 'components/kit/SelectListBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

export type MenuRenderIconProps = {|
  active?: boolean,
  color?: string,
  selected?: boolean,
|}

export type MenuItemProps = {|
  active?: boolean,
  color?: string,
  icon?: React.Element<any>, // flowlint-line unclear-type:off
  label: string,
  noAnimation?: boolean,
  onSelect?: () => void,
  renderCheck?: boolean,
  renderIcon?: MenuRenderIconProps => React.Node,
  selected?: boolean,
  // Probably should be in the separate SelectItem or something like that
  value?: any, // flowlint-line unclear-type:off
|}

type Props = {|
  ...MenuItemProps,
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
  },
  label: {
    ...theme.fontMedium(18, 26),
    // оверфлоу лейбл враппера конкурирует с checkIcon
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  hasLabelIcon: {
    '& $label': {
      display: 'flex',
      alignItems: 'center',
      // любая иконка будет первым чайлдом, делаем чтобы она не растягивалась
      '& > *:first-child': {
        flexShrink: 0,
      },
    },
  },
  labelIcon: {
    width: 22,
    marginRight: 12,
  },
  // текстовый лейбл имет свой оверфлоу на случай конкуренции с labelIcon
  labelText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  check: {
    width: 24,
    height: 24,
  },
  selected: {
    cursor: 'default',
    '& $label': {
      marginRight: 10,
    },
  },
  active: {
    background: getActiveBackgroundColor,
  },
})

const MenuItem = ({
  classes,
  className,
  selected,
  active,
  label,
  color,
  icon,
  noAnimation,
  renderIcon,
  theme,
  renderCheck,
  ...otherProps
}: Props) => (
  <div
    className={cx(
      classes.root,
      (icon || typeof renderIcon === 'function') && classes.hasLabelIcon,
      selected && classes.selected,
      active && classes.active,
      className
    )}
    data-active-color={getActiveBackgroundColor({ color })}
    {...otherProps}
  >
    <div className={classes.label}>
      {icon &&
        React.isValidElement(icon) &&
        React.cloneElement(icon, {
          className: cx(icon.props.className, classes.labelIcon),
        })}
      {!icon &&
        typeof renderIcon === 'function' &&
        renderIcon({ selected, active, color })}
      <span className={classes.labelText}>{label}</span>
    </div>
    {!renderCheck && selected && <CheckCircle className={classes.check} />}
    {typeof renderCheck === 'function' &&
      renderCheck({ selected, active, color })}
  </div>
)

MenuItem.defaultProps = {
  color: '#252B43',
  noAnimation: false,
}

const StyledMenuItem = injectStyles(styles)(MenuItem)

const SelectMenuItem = (props: MenuItemProps) => (
  <SelectListBase.Consumer>
    {({ getItemProps }) => <StyledMenuItem {...getItemProps(props)} />}
  </SelectListBase.Consumer>
)

export default SelectMenuItem
