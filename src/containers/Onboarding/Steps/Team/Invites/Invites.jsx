import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { TEAM_ROLE_TITLES } from 'const'

const styles = theme => ({
  root: {
    width: 550,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(37, 43, 67, 0.07)',
    },
  },
  email: {
    color: '#252B43',
    ...theme.fontMedium(18),
  },
  role: {
    color: 'rgba(32, 40, 74, 0.3)',
    ...theme.fontRegular(18),
  },
})

const Invites = ({ classes, className, invites }) => (
  <div className={cx(classes.root, className)}>
    {invites.map(({ email, role }) => (
      <div className={classes.item}>
        <div className={classes.email}>{email}</div>
        <div className={classes.role}>{TEAM_ROLE_TITLES[role]}</div>
      </div>
    ))}
  </div>
)

export default injectStyles(styles)(Invites)
