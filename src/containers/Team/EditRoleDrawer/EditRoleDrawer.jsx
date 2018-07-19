import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Drawer from 'components/Drawer'
import EditRole from './EditRole'
import ACTIONS from './actions'

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onClose: ACTIONS.cancel,
  },
])

const EditRoleDrawer = ({ id, ...otherProps }) => (
  <Drawer {...otherProps}>
    <EditRole id={id} />
  </Drawer>
)

export default connect(
  null,
  mapDispatchToProps
)(EditRoleDrawer)
