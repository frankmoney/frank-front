// @flow strict-local
import * as React from 'react'
import SwitchBase from 'components/kit/SwitchBase'
import CheckboxDumb, { type CheckboxProps } from './CheckboxDumb'

type PublicProps = {|
  ...CheckboxProps,
  //
  className?: string,
|}

const Checkbox = ({
  checked,
  defaultChecked,
  onChange,
  ...props
}: PublicProps) => (
  <SwitchBase on={checked} defaultOn={defaultChecked} onToggle={onChange}>
    {({ on, toggle }) => (
      <CheckboxDumb checked={on} onChange={toggle} {...props} />
    )}
  </SwitchBase>
)

export default Checkbox
