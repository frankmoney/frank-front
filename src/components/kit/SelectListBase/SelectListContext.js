import React from 'react'

export default React.createContext({
  value: null,
  select: () => {},
  getItemProps: props => props,
  getContainerProps: props => props,
})
