import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose, defaultProps } from 'recompose'
import CloseButton from './CloseButton'

const styles = {
  root: {
    display: 'flex',
    marginBottom: 50,
  },
  contents: {
    flex: 1,
  },
  buttons: {
    flex: 0,
    whiteSpace: 'nowrap',
  },
}

const DrawerHeader = ({ classes, buttons, children }) => (
  <div className={classes.root}>
    <div className={classes.contents}>{children}</div>
    {buttons && <div className={classes.buttons}>{buttons}</div>}
  </div>
)

export default compose(
  defaultProps({
    buttons: CloseButton,
  }),
  injectStyles(styles)
)(DrawerHeader)
