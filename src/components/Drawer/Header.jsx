import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import renderProp from 'utils/renderProp'

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
    {buttons && <div className={classes.buttons}>{renderProp(buttons)}</div>}
  </div>
)

export default injectStyles(styles)(DrawerHeader)
