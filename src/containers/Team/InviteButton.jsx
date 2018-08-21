import React from 'react'
import { GiantButton } from '@frankmoney/components'
import AddIcon from 'material-ui-icons/Add'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'
import { ROUTES } from 'const'

const InviteButton = () => (
  <ListLayoutContentBlock>
    <GiantButton
      label="Invite a teammate"
      icon={AddIcon}
      href={ROUTES.team.invite}
    />
  </ListLayoutContentBlock>
)

export default InviteButton
