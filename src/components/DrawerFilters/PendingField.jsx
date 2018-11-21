// @flow strict-local
import React from 'react'
import Drawer from 'components/kit/Drawer'
import Switch from 'components/kit/Switch'

type Props = {|
  value: ?boolean,
  onChange: (?boolean) => void,
|}

const PendingField = ({ value, onChange }: Props) => (
  <Drawer.Field label="Show">
    <Switch label="Pending payments" value={!!value} onChange={onChange} />
  </Drawer.Field>
)

export default PendingField
