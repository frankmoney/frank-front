import React from 'react'
import { withProps } from 'recompose'
import MenuItem from 'components/kit/Menu/MenuItem'
import Switch from 'components/kit/Switch'

const renderSwitch = ({ selected }) => <Switch checked={selected} />

export default withProps({ renderCheck: renderSwitch })(MenuItem)
