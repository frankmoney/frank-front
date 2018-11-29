import React from 'react'
import { getFormValues } from 'redux-form/immutable'
import { ConfirmDialog } from 'components/kit/Dialog'
import reconnect from 'utils/reconnect'

const UpdateInfoConfirmDialog = ({ form, data, onConfirm, ...props }) => (
  <ConfirmDialog
    title="Update payment info?"
    message="Some of the mandatory fields are empty. If you decide to proceed, the payment will be unpublished."
    confirmLabel="Update and unpublish"
    danger
    onConfirm={() => onConfirm(data)}
    {...props}
  />
)

export default reconnect((_, props) => ({
  data: getFormValues(props.form),
}))(UpdateInfoConfirmDialog)
