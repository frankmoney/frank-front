import React, { Fragment } from 'react'
import { injectStyles } from '@frankmoney/ui'
import Paper from './Paper'
import Profile from './Profile'

const styles = {
  root: {},
  separator: {
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    borderBottom: '1px solid rgba(37, 43, 67, 0.07)',
  },
}

const ProfileList = ({ classes, profiles, onEditRole }) => (
  <Paper className={classes.root}>
    {profiles &&
      profiles.map((profile, index) => (
        <Fragment key={profile.id}>
          {!index || <hr className={classes.separator} />}
          <Profile {...profile} onEditRole={onEditRole} />
        </Fragment>
      ))}
  </Paper>
)

export default injectStyles(styles)(ProfileList)
