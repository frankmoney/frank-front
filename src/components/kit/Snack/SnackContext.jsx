import React from 'react'
import SnackManager from './SnackManager'

export default React.createContext({
  manager: new SnackManager(),
  viewportOffsetHorizontal: 10,
  viewportOffsetVertical: 10,
})
