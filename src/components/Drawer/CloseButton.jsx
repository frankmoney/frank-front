import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import DrawerContext from 'contexts/DrawerContext'
import CloseIcon from './CloseIcon.svg'

const styles = {
  root: {
    marginLeft: 20,
    marginTop: 13,
    cursor: 'pointer',
    color: '#D8D8D8',
    stroke: '#D8D8D8',
    fill: '#D8D8D8',
    '&:hover': {
      stroke: '#000',
      fill: '#000',
    },
  },
}

const CloseButton = ({ classes, ...otherProps }) => (
  <DrawerContext.Consumer>
    {({ onClose }) => (
      <CloseIcon className={classes.root} onClick={onClose} {...otherProps} />
    )}
  </DrawerContext.Consumer>
)

export default injectStyles(styles)(CloseButton)
