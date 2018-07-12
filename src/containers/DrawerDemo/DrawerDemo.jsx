import React from 'react'
import { connect } from 'react-redux'
import { push as pushLocation } from 'react-router-redux'
import { ROUTES } from 'const'
import Drawer1 from './Drawer1'
import Drawer2 from './Drawer2'
import Drawer3 from './Drawer3'
import Drawer4 from './Drawer4'

const DrawerDemo = ({ type, handleClose }) => (
  <>
    <Drawer1 open={type === 'type-1'} onClose={handleClose} />
    <Drawer2 open={type === 'type-2'} onClose={handleClose} />
    <Drawer3 open={type === 'type-3'} onClose={handleClose} />
    <Drawer4 open={type === 'type-4'} onClose={handleClose} />
  </>
)

export default connect(
  null,
  dispatch => ({
    handleClose: () => dispatch(pushLocation(ROUTES.demo.drawers.root)),
  })
)(DrawerDemo)
