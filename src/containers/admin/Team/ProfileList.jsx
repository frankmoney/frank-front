// @flow strict-local
import React from 'react'
import { injectStyles } from 'utils/styles'
import Paper from './Paper'
import Profile from './Profile'
import InvitesChips from './InvitesChips'

const styles = theme => ({
  root: {},
  title: {
    color: '#252B43',
    ...theme.fontRegular(22, 22),
    marginBottom: 35,
    marginLeft: 30,
    '&:first-child': {
      marginTop: 30,
    },
  },
  invites: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
  },
  item: {
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(37, 43, 67, 0.07)',
    },
  },
})

const ProfileList = ({ classes, profiles, invites }) => {
  const hasInvites = invites.length > 0

  return (
    <Paper className={classes.root}>
      {hasInvites && <div className={classes.title}>Invites</div>}
      {hasInvites && (
        <InvitesChips className={classes.invites} invites={invites} />
      )}
      {hasInvites && <div className={classes.title}>Team</div>}
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
}
export default injectStyles(styles)(ProfileList)
