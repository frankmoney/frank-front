import React from 'react'
import { ConfirmDialog, DialogMessage } from '@frankmoney/components'

const PaymentsTableMultipleEditDialog = ({
  hasPassedEvents,
  attendingParticipantsCount,
  onConfirmClick,
  onCancelClick,
  ...dialogProps
}) => (
  <ConfirmDialog
    danger
    title="Are you sure?"
    confirmLabel="Remove anyway"
    cancelLabel="Cancel"
    onConfirm={onConfirmClick}
    onCancel={onCancelClick}
    {...dialogProps}
  >
    <DialogMessage>TEST</DialogMessage>
  </ConfirmDialog>
)

export default PaymentsTableMultipleEditDialog
