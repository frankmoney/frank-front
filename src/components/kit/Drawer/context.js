// @flow
import React from 'react'

export type DrawerContextType = {|
  open: boolean,
  close: () => void,
|}

export default React.createContext<DrawerContextType>({
  open: false,
  close: () => {},
})
