// @flow
import * as React from 'react'
import Button, { IconButton } from 'components/kit/Button'
import SwitchBase from 'components/kit/SwitchBase'

const withToggle = (ButtonComponent, defaultOffColor, defaultOnColor) =>
  // $FlowFixMe: forwardRef is not supported in flow out of the box yet
  React.forwardRef(
    (
      {
        on,
        defaultOn,
        onToggle,
        color,
        colorOn = defaultOnColor,
        colorOff = defaultOffColor,
        ...otherProps
      },
      ref
    ) => (
      <SwitchBase on={on} defaultOn={defaultOn} onToggle={onToggle}>
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

const ToggleButton = withToggle(Button, 'gray', 'lightBlue')

ToggleButton.Icon = withToggle(IconButton, 'gray', 'lightBlue')

export default ToggleButton
