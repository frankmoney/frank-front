// @flow strict-local
import * as React from 'react'
import Button, { IconButton, type ButtonProps } from 'components/kit/Button'
import SwitchBase from 'components/kit/SwitchBase'
import forwardRef from 'utils/forwardRef'

type Color = string

type ButtonComponentType = React.ComponentType<ButtonProps>

type ToggleButtonExport = {|
  (): (props: ButtonProps) => React.Node,
  Icon: ButtonComponentType,
|}

const withToggle = (
  ButtonComponent: ButtonComponentType,
  defaultOffColor: Color,
  defaultOnColor: Color
): ButtonComponentType =>
  forwardRef(
    (
      {
        on: propOn,
        defaultOn,
        onToggle,
        color,
        colorOn = defaultOnColor,
        colorOff = defaultOffColor,
        ...otherProps
      },
      ref
    ) => (
      <SwitchBase on={propOn} defaultOn={defaultOn} onToggle={onToggle}>
        {({ on, toggle }) => (
          <ButtonComponent
            ref={ref}
            color={on ? colorOn : colorOff}
            onClick={toggle}
            {...otherProps}
          />
        )}
      </SwitchBase>
    )
  )

// flowlint-next-line unclear-type:off
const ToggleButton: any = withToggle(Button, 'gray', 'lightBlue')

ToggleButton.Icon = withToggle(IconButton, 'gray', 'lightBlue')

export default (ToggleButton: ToggleButtonExport)
