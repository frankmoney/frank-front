// @flow strict-local
import * as React from 'react'
import Modal from 'components/kit/Modal'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import DialogPaper from './DialogPaper'

type Props = {|
  ...InjectStylesProps,
  //
  children?: React.Node,
|}

const styles = {
  modal: {
    display: 'flex',
    marginTop: 200,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
}

class Dialog extends React.Component<Props> {
  render() {
    const {
      classes,
      theme,
      children,
      open,
      onClose,
      modalProps,
      ...otherProps
    } = this.props

    return (
      <Modal
        fallInsideFocus
        className={classes.modal}
        open={open}
        onClose={onClose}
        {...modalProps}
      >
        <DialogPaper {...otherProps}>{children}</DialogPaper>
      </Modal>
    )
  }
}

export default injectStyles(styles)(Dialog)
