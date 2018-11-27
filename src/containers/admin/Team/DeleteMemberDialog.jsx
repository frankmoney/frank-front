import React from 'react'
import { ConfirmDialog } from 'components/kit/Dialog'

const DeleteMemberDialog = props => (
  <ConfirmDialog
    title="Delete teammate?"
    confirmLabel="Delete"
    danger
    {...props}
  />
)

export default DeleteMemberDialog
