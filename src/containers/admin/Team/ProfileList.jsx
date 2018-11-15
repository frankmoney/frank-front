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

const ProfileList = ({ classes, profiles }) => (
  <Paper className={classes.root}>
    {profiles &&
      profiles.map(({ acl, ...profile }, index) => (
        <Fragment key={profile.id}>
          {!index || <hr className={classes.separator} />}
          <Profile profile={profile} acl={acl} />
        </Fragment>
      ))}
  </Paper>
)

export default injectStyles(styles)(ProfileList)
