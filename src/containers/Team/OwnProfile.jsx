import React from 'react'
import Paper from './Paper'
import Profile from './Profile'

const OwnProfile = ({ profile }) => (
  <Paper>
    <Profile large {...profile} />
  </Paper>
)

export default OwnProfile
