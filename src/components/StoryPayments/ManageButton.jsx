import React from 'react'
import { Menu as ManageIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    ...theme.fontMedium(20, 22),
    color: 'rgba(37, 43, 67, 0.4)',
    '&:hover': {
      color: '#484DE7',
    },
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 14,
  },
})

const ManageButton = ({ classes, onClick }) => (
  <div className={classes.container} onClick={onClick}>
    Manage <ManageIcon className={classes.icon} />
  </div>
)

export default injectStyles(styles)(ManageButton)
