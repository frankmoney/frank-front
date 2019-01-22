import React from 'react'
import Sidebar from './Sidebar'

const AdminLayout = ({ sidebarProps, ...props }) => (
  <Sidebar {...sidebarProps} {...props} />
)

export default AdminLayout
