import React from 'react'
import chainCallbacks from 'utils/dom/chainCallbacks'
import Button from '../Button'
import Dialog from './Dialog'
import DialogTitle from './DialogTitle'
import DialogMessage from './DialogMessage'
import DialogPaper from './DialogPaper'
import DialogButtons from './DialogButtons'

const ConfirmDialog = ({
  classes,
  title,
  message,
  confirmLabel,
  cancelLabel,
  confirmButtonProps,
  cancelButtonProps,
  children,
  onConfirm,
  onCancel,
  onClose,
  danger,
  ...dialogProps
}) => (
  <Dialog onClose={onClose} {...dialogProps}>
    {title && <DialogTitle>{title}</DialogTitle>}
    {message && <DialogMessage>{message}</DialogMessage>}
    {children}
    <DialogButtons>
      <Button
        color="gray"
        onClick={chainCallbacks(onCancel, onClose)}
        label={cancelLabel}
        {...cancelButtonProps}
      />
      <Button
        color={danger ? 'red' : 'green'}
        onClick={chainCallbacks(onConfirm, onClose)}
        label={confirmLabel}
        {...confirmButtonProps}
      />
    </DialogButtons>
  </Dialog>
)

ConfirmDialog.defaultProps = {
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  danger: false,
}

export default ConfirmDialog
