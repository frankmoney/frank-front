import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import ButtonBase from './ButtonBase'

const styles = {
  button: {
    width: 50,
    borderRadius: '50%',
  },
}

const MoreButton = ({ classes }) => (
  <ButtonBase buttonClassName={classes.button}>
    &hellip;
  </ButtonBase>
)

export default injectStyles(styles)(MoreButton)
