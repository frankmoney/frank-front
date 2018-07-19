import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Paper from './Paper'
import Profile from './Profile'
import { ownProfileSelector } from './selectors'

const mapStateToProps = createStructuredSelector({
  profile: ownProfileSelector,
})

const OwnProfile = ({ profile }) => (
  <Paper>
    <Profile large {...profile} />
  </Paper>
)

export default connect(mapStateToProps)(OwnProfile)
