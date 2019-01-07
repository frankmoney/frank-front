import React from 'react'
import cx from 'classnames'
import { Send as IconSend } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    background: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 3,
    height: 40,
    color: 'rgba(37, 43, 67, 0.4)',
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
    padding: [0, 10],
  },
  chipIcon: {
    marginRight: 10,
    height: 20,
  },
  chipText: {
    ...theme.fontRegular(18, 26),
  },
})

const InvitesChips = ({ classes, className, invites }) => (
  <div className={cx(classes.root, className)}>
    {invites.map(({ email }) => (
      <div className={classes.chip}>
        <IconSend className={classes.chipIcon} />
        <div className={classes.chipText}>{email}</div>
      </div>
    ))}
  </div>
)

export default injectStyles(styles)(InvitesChips)
