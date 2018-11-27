// @flow
import React from 'react'
import { compose, withHandlers } from 'recompose'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'
import { BigButton } from 'components/kit/Button'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'

const InviteButton = ({ handleClick }) => (
  <ListLayoutContentBlock>
    <BigButton label="Invite a teammate" onClick={handleClick} />
  </ListLayoutContentBlock>
)

export default compose(
  reconnect(null, {
    openInviteDrawer: ACTIONS.openInviteDrawer,
  }),
  withHandlers({
    handleClick: ({ openInviteDrawer }) => event => {
      event.preventDefault()
      openInviteDrawer()
    },
  })
)(InviteButton)
