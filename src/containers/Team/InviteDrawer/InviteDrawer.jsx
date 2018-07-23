import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Drawer from 'components/Drawer'
import Invite from './Invite'
import ACTIONS from './actions'

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onClose: ACTIONS.cancel,
  },
])

const InviteDrawer = props => (
  <Drawer {...props}>
    <Invite />
  </Drawer>
)

export default connect(
  null,
  mapDispatchToProps
)(InviteDrawer)
