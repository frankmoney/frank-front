// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { Send as IconSend } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    background: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 15,
    height: 40,
  },
  icon: {
    color: 'rgba(37, 43, 67, 0.4)',
    ...theme.fontRegular(18),
    marginRight: 10,
  },
  email: {
    color: 'rgba(0,0,0,0.4)',
    ...theme.fontRegular(18),
  },
})

const Invites = ({ classes, className, email }) => (
  <div className={cx(classes.root, className)}>
    <IconSend className={classes.icon} />
    <div className={classes.email}>{email}</div>
  </div>
)

export default injectStyles(styles)(Invites)
