// @flow strict-local
import * as React from 'react'
import Modal, { type ModalProps } from 'components/kit/Modal'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import DialogPaper from './DialogPaper'

type InheritedModalProps = {|
  open?: boolean,
  onClose?: () => void,
|}

type Props = {|
  ...InjectStylesProps,
  ...InjectStylesProps,
  ...InheritedModalProps,
  modalProps: $Exact<$Diff<ModalProps, InheritedModalProps>>,
|}

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const Dialog = ({
  classes,
  open,
  onClose,
  modalProps,
  ...otherProps
}: Props) => (
  <Modal
    fallInsideFocus
    className={classes.modal}
    open={open}
    onClose={onClose}
    {...modalProps}
  >
    <DialogPaper {...otherProps} />
  </Modal>
)

export default injectStyles(styles)(Dialog)
