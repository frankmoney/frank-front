// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { CheckCircle } from 'material-ui-icons'
import Color from 'color-js'
import SelectListBase from 'components/kit/SelectListBase'

type Props = {
  label: string,
  selected?: boolean,
  active?: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  color?: string,
  icon?: ?Element,
  renderIcon?: Props => Element,
}

const styles = theme => ({
  root: {
    height: 50,
    padding: [0, 15],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'transparent',
    transition: theme.transition('background-color'),
    color: props => props.color,
    outline: 'none',
    cursor: 'pointer',
  },
  label: {
    ...theme.fontRegular(18),
  },
  hasLabelIcon: {
    '& $label': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  labelIcon: {
    width: 22,
    marginRight: 12,
  },
  check: {
    width: 24,
    height: 24,
  },
  selected: {
    cursor: 'default',
    '& $label': {
      ...theme.fontMedium(18),
    },
  },
  active: {
    background: props =>
      props.color
        ? Color(props.color).setAlpha(0.06)
        : 'rgba(37, 43, 67, 0.04)',
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
  renderIcon,
  theme,
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
    {...otherProps}
  >
    <div className={classes.label}>
      {icon &&
        React.cloneElement(icon, {
          className: cx(icon.props.className, classes.labelIcon),
        })}
      {!icon &&
        typeof renderIcon === 'function' &&
        renderIcon({ selected, active, color })}
      {label}
    </div>
    {selected && <CheckCircle className={classes.check} />}
  </div>
)

MenuItem.defaultProps = {
  color: '#252B43',
}

const StyledMenuItem = injectStyles(styles)(MenuItem)

const SelectMenuItem = props => (
  <SelectListBase.Consumer>
    {({ getItemProps }) => <StyledMenuItem {...getItemProps(props)} />}
  </SelectListBase.Consumer>
)

export default SelectMenuItem
