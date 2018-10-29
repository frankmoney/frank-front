import React from 'react'
import { withProps } from 'recompose'
import MenuItem from 'components/kit/Menu/MenuItem'

const renderCategoryIcon = ({ color }) => (
  <div
    style={{
      borderRadius: '50%',
      height: 14,
      width: 14,
      marginRight: 14,
      backgroundColor: color,
    }}
  />
)

export default withProps({ renderIcon: renderCategoryIcon })(MenuItem)
