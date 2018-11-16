// @flow strict-local
import * as React from 'react'
import Button, { type ButtonProps } from 'components/kit/Button'
import chainCallbacks from 'utils/dom/chainCallbacks'
import Dialog from './Dialog'
import DialogTitle from './DialogTitle'
import DialogMessage from './DialogMessage'
import DialogButtons from './DialogButtons'

type EmptyCb = () => void

type OmittedProps = {|
  classes?: Object, // flowlint-line unclear-type:off
|}

type Props = {|
  ...OmittedProps,
  //
  cancelButtonProps?: ButtonProps,
  cancelLabel: string,
  children?: React.Node,
  confirmButtonProps?: ButtonProps,
  confirmLabel: string,
  danger: boolean,
  message?: string,
  onCancel?: EmptyCb,
  onClose?: EmptyCb,
  onConfirm?: EmptyCb,
  title?: string,
|}

const ConfirmDialog = ({
  cancelButtonProps,
  cancelLabel,
  children,
  classes,
  confirmButtonProps,
  confirmLabel,
  danger,
  message,
  onCancel,
  onClose,
  onConfirm,
  title,
  ...dialogProps
}: Props) => (
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
