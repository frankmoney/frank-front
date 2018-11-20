// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { IconPlainButton } from 'components/kit/Button'
import CloseIcon from 'components/kit/Drawer/CloseIcon.svg'
import Modal, { type ModalProps } from 'components/kit/Modal'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import DialogPaper from './DialogPaper'

export type InheritedModalProps = {|
  open?: boolean,
  onClose?: () => void,
|}

type Props = {|
  ...InjectStylesProps,
  ...InheritedModalProps,
  //
  children?: React.Node,
  closeButton: boolean,
  modalProps: $Exact<$Diff<ModalProps, InheritedModalProps>>,
|}

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 39,
    top: 45,
  },
}

const Dialog = ({
  classes,
  className,
  children,
  closeButton,
  open,
  onClose,
  modalProps,
}: Props) => (
  <Modal
    fallInsideFocus
    className={classes.modal}
    open={open}
    onClose={onClose}
    {...modalProps}
  >
    <DialogPaper className={cx({ [classes.paper]: closeButton }, className)}>
      {closeButton && (
        <IconPlainButton
          icon={<CloseIcon />}
          onClick={onClose}
          className={classes.closeButton}
        />
      )}
      {children}
    </DialogPaper>
  </Modal>
)

Dialog.defaultProps = {
  closeButton: false,
}

export default injectStyles(styles)(Dialog)
