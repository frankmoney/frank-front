// @flow strict-local
import React from 'react'
import { injectStyles } from 'utils/styles'
import Paper from './Paper'
import Profile from './Profile'

const styles = {
  root: {},
  item: {
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(37, 43, 67, 0.07)',
    },
  },
}

const ProfileList = ({ classes, profiles }) => (
  <Paper className={classes.root}>
    {profiles.map(({ acl, ...profile }) => (
      <Profile
        key={profile.id}
        className={classes.item}
        profile={profile}
        acl={acl}
      />
    ))}
  </Paper>
)

export default injectStyles(styles)(ProfileList)
