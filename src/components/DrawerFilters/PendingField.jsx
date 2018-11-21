// @flow strict-local
import React from 'react'
import Drawer from 'components/kit/Drawer/index'
import Switch from 'components/kit/Switch/index'

type Props = {|
  value: ?boolean,
  onChange: (?boolean) => void,
|}

const VerificationField = ({ value, onChange }: Props) => (
  <Drawer.Field label="Show">
    <Switch label="Pending payments" value={!!value} onChange={onChange} />
  </Drawer.Field>
)

export default VerificationField
