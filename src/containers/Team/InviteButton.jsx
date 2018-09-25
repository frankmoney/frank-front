import React from 'react'
import { GiantButton } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import AddIcon from 'material-ui-icons/Add'
import { compose, withPropsOnChange } from 'recompose'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'

const styles = theme => ({
  button: {
    ...theme.fontMedium(18),
    color: '#fff',
    backgroundColor: '#4C51F3',
    '&:hover': {
      backgroundColor: '#4C51F3',
    },
  },
})

const InviteButton = ({ classes, handleClick }) => (
  <ListLayoutContentBlock>
    <GiantButton
      className={classes.button}
      label="Invite a teammate"
      icon={AddIcon}
      href="#invite"
      onClick={handleClick}
    />
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
  })),
  injectStyles(styles)
)(InviteButton)
