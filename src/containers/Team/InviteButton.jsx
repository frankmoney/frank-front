import React from 'react'
import { GiantButton } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import AddIcon from 'material-ui-icons/Add'
import ListLayoutContentBlock from 'components/ListLayoutContentBlock'

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

const InviteButton = ({ classes }) => (
  <ListLayoutContentBlock>
    <GiantButton
      className={classes.button}
      label="Invite a colleague"
      icon={AddIcon}
    />
  </ListLayoutContentBlock>
)

export default injectStyles(styles)(InviteButton)
