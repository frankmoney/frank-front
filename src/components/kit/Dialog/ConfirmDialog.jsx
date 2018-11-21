// @flow strict-local
import * as React from 'react'
import Button from 'components/kit/Button'
import chainCallbacks from 'utils/dom/chainCallbacks'
import Dialog, { type InheritedModalProps } from './Dialog'
import DialogTitle from './DialogTitle'
import DialogMessage from './DialogMessage'
import DialogButtons from './DialogButtons'

type EmptyCb = () => void

type OmittedProps = {|
  classes?: Object, // flowlint-line unclear-type:off
|}

type Props = {|
  ...OmittedProps,
  ...InheritedModalProps,
  //
  cancelButtonProps?: React.ElementConfig<typeof Button>,
  cancelLabel: string,
  children?: React.Node,
  className?: string,
  confirmButtonProps?: React.ElementConfig<typeof Button>,
  confirmLabel: string,
  danger: boolean,
  message?: string,
  onCancel?: EmptyCb,
  onConfirm?: EmptyCb,
  title?: string,
|}

const ConfirmDialog = ({
  cancelButtonProps,
  cancelLabel,
  children,
  className,
  confirmButtonProps,
  confirmLabel,
  danger,
  message,
  onCancel,
  onClose,
  onConfirm,
  title,
  // omit
  classes,
  ...dialogProps
}: Props) => (
  <Dialog onClose={onClose} className={className} {...dialogProps}>
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
