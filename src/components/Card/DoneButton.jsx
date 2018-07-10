import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import CheckIcon from 'material-ui-icons/Check'
import ButtonBase from './ButtonBase'

const styles = {
  button: {
    color: '#fff',
    backgroundColor: '#21CB61',
    '&:hover': {
      backgroundColor: '#21CB61',
      boxShadow: 'none',
    },
  },
}

const DoneButton = ({ classes }) => (
  <ButtonBase buttonClassName={classes.button} icon={CheckIcon}>
    Done
  </ButtonBase>
)

export default injectStyles(styles)(DoneButton)
