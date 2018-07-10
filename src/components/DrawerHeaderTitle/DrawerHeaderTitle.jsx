import React from 'react'
import Clamp from 'shiitake'

const DrawerHeaderTitle = ({ lineClamp, children }) =>
  lineClamp ? (
    <Clamp lines={lineClamp}>{children}</Clamp>
  ) : (
    <div>{children}</div>
  )

export default DrawerHeaderTitle
