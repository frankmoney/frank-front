// @flow
import React from 'react'
import SwitchBase from 'components/kit/SwitchBase'
import SwitchUncontrolled, {
  type SwitchUncontrolledProps,
} from './SwitchUncontrolled'

type Props = {|
  ...SwitchUncontrolledProps,
  //
|}

const Switch = ({
  checked,
  defaultChecked,
  onChange,
  focus,
  onFocus,
  onBlur,
  ...props
}: Props) => (
  <SwitchBase
    focus={focus}
    on={checked}
    defaultOn={defaultChecked}
    onToggle={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
  >
    {({ on, focus: focusState, focusIn, focusOut, toggle }) => (
      <SwitchUncontrolled
        checked={on}
        focus={focusState}
        onChange={toggle}
        onFocus={focusIn}
        onBlur={focusOut}
        {...props}
      />
    )}
  </SwitchBase>
)

export default Switch
