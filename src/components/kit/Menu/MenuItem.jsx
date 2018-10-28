// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { CheckCircle } from 'material-ui-icons'
import SelectListBase from 'components/kit/SelectListBase'

type Props = {
  label: string,
  selected?: boolean,
  active?: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  color?: string,
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
    background: 'rgba(37, 43, 67, 0.04)',
  },
})

const MenuItem = ({
  classes,
  className,
  selected,
  active,
  label,
  theme,
  ...otherProps
}: Props) => (
  <div
    className={cx(
      classes.root,
      selected && classes.selected,
      active && classes.active,
      className
    )}
    {...otherProps}
  >
    <div className={classes.label}>{label}</div>
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
