import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { createRouteUrl } from '@frankmoney/utils'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { push as pushLocation } from 'react-router-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import { ROUTES } from 'const'
import Paper from './Paper'
import Profile from './Profile'
import { otherProfilesSelector } from './selectors'

const mapStateToProps = createStructuredSelector({
  profiles: otherProfilesSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    handleEditProfile: ({ id }) =>
      pushLocation(
        createRouteUrl(ROUTES.team.match, { action: 'edit-role', id })
      ),
  },
])

const styles = {
  root: {},
  separator: {
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    borderBottom: '1px solid rgba(37, 43, 67, 0.07)',
  },
}

const ProfileList = ({ classes, profiles, handleEditProfile }) => (
  <Paper className={classes.root}>
    {profiles &&
      profiles.map((profile, index) => (
        <>
          {!index || <hr className={classes.separator} />}
          <Profile {...profile} onEditProfile={handleEditProfile} />
        </>
      ))}
  </Paper>
)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectStyles(styles)
)(ProfileList)
