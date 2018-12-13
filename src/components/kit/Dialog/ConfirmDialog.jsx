// @flow strict-local
import * as React from 'react'
import Button from 'components/kit/Button'
import chainCallbacks from 'utils/dom/chainCallbacks'
import Dialog, { type InheritedModalProps } from './Dialog'
import DialogButton from './DialogButton'
import DialogButtons from './DialogButtons'
import DialogMessage from './DialogMessage'
import DialogTitle from './DialogTitle'

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
  disableCloseOnConfirm?: boolean,
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
  confirmButtonProps,
  confirmLabel,
  danger,
  message,
  onCancel,
  onClose,
  onConfirm,
  disableCloseOnConfirm,
  title,
  // omit
  classes,
  ...dialogProps
}: Props) => (
  <Dialog onClose={onClose} {...dialogProps}>
    {title && <DialogTitle withMessage={!!message}>{title}</DialogTitle>}
    {message && <DialogMessage>{message}</DialogMessage>}
    {children}
    <DialogButtons>
      <DialogButton
        color="gray"
        onClick={chainCallbacks(onCancel, onClose)}
        label={cancelLabel}
        {...cancelButtonProps}
      />
      <DialogButton
        color={danger ? 'red' : 'green'}
        onClick={chainCallbacks(onConfirm, !disableCloseOnConfirm && onClose)}
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
