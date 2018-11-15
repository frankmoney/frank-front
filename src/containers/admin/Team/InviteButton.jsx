// @flow
import React from 'react'
import { compose, withPropsOnChange } from 'recompose'
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
  withPropsOnChange(['openInviteDrawer'], ({ openInviteDrawer }) => ({
    handleClick: event => {
      event.preventDefault()
      openInviteDrawer()
    },
  }))
)(InviteButton)
