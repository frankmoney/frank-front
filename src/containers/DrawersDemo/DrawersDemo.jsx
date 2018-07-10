import React from 'react'
import { createRouteUrl } from '@frankmoney/utils'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push as pushLocation } from 'react-router-redux'
import Drawer1 from 'components/Drawer1'
import Drawer2 from 'components/Drawer2'
import Drawer3 from 'components/Drawer3'
import Drawer4 from 'components/Drawer4'
import { ROUTES } from 'const'

const renderLink = i => (
  <div>
    <Link
      to={createRouteUrl(ROUTES.demo.drawers.parameterized, {
        type: `type-${i}`,
      })}
    >
      Drawer {i}
    </Link>
  </div>
)

const DrawersDemo = ({
  handleClose,
  match: {
    params: { type },
  },
}) => (
  <>
    <Drawer1 open={type === 'type-1'} onClose={handleClose} />
    <Drawer2 open={type === 'type-2'} onClose={handleClose} />
    <Drawer3 open={type === 'type-3'} onClose={handleClose} />
    <Drawer4 open={type === 'type-4'} onClose={handleClose} />

    {renderLink(1)}
    {renderLink(2)}
    {renderLink(3)}
    {renderLink(4)}
  </>
)

export default connect(
  null,
  dispatch => ({
    handleClose: () => dispatch(pushLocation(ROUTES.demo.drawers.root)),
  })
)(DrawersDemo)
