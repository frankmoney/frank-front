import React from 'react'
import { GiantButton } from '@frankmoney/components'
import AddIcon from 'material-ui-icons/Add'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'

const NewButton = ({ onClick }) => (
  <ListLayoutContentBlock>
    <GiantButton label="Add payments" icon={AddIcon} onClick={onClick} />
  </ListLayoutContentBlock>
)

export default NewButton
