// @flow strict-local
import React from 'react'
import Checkbox from 'components/kit/Checkbox'
import ToggleButton from 'components/kit/ToggleButton'
import { type CheckboxProps } from 'components/common/TimelineChart'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  checkbox: {
    pointerEvents: 'none',
    position: 'absolute',
  },
}

type Props = {|
  ...InjectStylesProps,
  ...$Exact<CheckboxProps>,
|}

const CheckboxButton = ({
  checked,
  classes,
  className,
  color,
  label,
  onChange,
}: Props) => {
  const icon = (
    <Checkbox
      disableExtendedHitZone
      className={classes.checkbox}
      checked={checked}
      color={color}
    />
  )
  const buttonColor = color === 'green' ? 'lightGreen' : 'lightBlue'
  return (
    <ToggleButton
      className={className}
      icon={icon}
      on={checked}
      onToggle={onChange}
      label={label}
      colorOn={buttonColor}
      colorOff="lightGray"
    />
  )
}

export default injectStyles(styles)(CheckboxButton)
