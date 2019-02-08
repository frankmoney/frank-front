import React from 'react'
import reconnect from 'utils/reconnect'
import Select from 'components/kit/Select'
import camelize from 'utils/camelize'
import MenuItem from 'components/kit/Menu/MenuItem'
import { peerTypeFilterSelector } from '../selectors'
import * as ACTIONS from '../actions'

const PeerTypeFilter = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={onChange}
    align="end"
    dropdownWidth={240}
    menuProps={{ title: 'Show ...' }}
  >
    <MenuItem key="donors" value="donors" label="Donors" />
    <MenuItem key="recipients" value="recipients" label="Recipients" />
    <MenuItem key="all" value="all" label="Donors & Recipients" />
  </Select>
)

export default reconnect(
  { value: peerTypeFilterSelector },
  { onChange: ACTIONS.changePeerFilter }
)(PeerTypeFilter)
