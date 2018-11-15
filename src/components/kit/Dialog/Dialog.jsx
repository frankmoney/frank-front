// @flow strict-local
import * as React from 'react'
import Modal from 'components/kit/Modal'
import getNextFocusableElement from 'utils/dom/getNextFocusableElement'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import unsafeFindDOMNode from 'utils/dom/unsafeFindDOMNode'
import DialogPaper from './DialogPaper'

type Props = {|
  ...InjectStylesProps,
  //
  children?: React.Node,
  disableEnforceInnerFocus: boolean,
|}

const styles = {
  wrap: {
    display: 'flex',
    marginTop: 200,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
}

class Dialog extends React.Component<Props> {
  static defaultProps = {
    disableEnforceInnerFocus: false,
  }

  handleDialogRef = ref => {
    this.dialogRef = ref
  }

  handleFocus = event => {
    if (
      this.disableEnforceInnerFocus ||
      !this.dialogRef ||
      event.target !== event.currentTarget
    ) {
      return
    }

    const innerFocusElement = getNextFocusableElement(
      unsafeFindDOMNode(this.dialogRef)
    )
    if (innerFocusElement) {
      innerFocusElement.focus()
    }
  }

  render() {
    const {
      classes,
      className,
      style,
      theme,
      children,
      ...otherProps
    } = this.props

    return (
      <Modal className={classes.wrap} {...otherProps}>
        <DialogPaper
          ref={this.handleDialogRef}
          className={className}
          style={style}
          onFocus={this.handleFocus}
          role="dialog"
        >
          {children}
        </DialogPaper>
      </Modal>
    )
  }
}

export default injectStyles(styles)(Dialog)
