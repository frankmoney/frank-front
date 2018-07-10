import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose, defaultProps } from 'recompose'
import Drawer from 'components/Drawer'

const styles = {
}

const renderItem = ({ classes }) => (

)

const Drawer5 = ({ classes, items, ...otherProps }) => (
  <Drawer {...otherProps}>
    <Drawer.Header buttons={Drawer.CloseButton}>
      <Drawer.Title>Similar payments</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      {items.map(item => renderItem({ classes, ...item }))}
    </Drawer.Body>
  </Drawer>
)

export default compose(
  defaultProps({
    items: [
      { }
    ]
  }),
  injectStyles(styles)
)(Drawer5)
