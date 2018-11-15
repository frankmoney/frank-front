// @flow
import React from 'react'
import cx from 'classnames'
import { findDOMNode } from 'react-dom'
import Modal from 'components/kit/Modal'
import Button from 'components/kit/Button'
import { injectStyles } from 'utils/styles'
import getNextFocusableElement from '../../../utils/dom/getNextFocusableElement'
import DialogPaper from '../Dialog/DialogPaper'
import DrawerPaper from './DrawerPaper'
import DrawerFooter from './DrawerFooter'
import DrawerTitle from './DrawerTitle'
import DrawerCloseButton from './DrawerCloseButton'
import DrawerContext from './context'

type Props = {
  open?: boolean,
  onClose?: () => void,
}

const styles = {
  paper: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: '1 0 auto',
    zIndex: 100,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    // temporary style
    position: 'fixed',
    top: 0,
    right: 0,
    // We disable the focus ring for mouse, touch and keyboard users.
    // At some point, it would be better to keep it for keyboard users.
    // :focus-ring CSS pseudo-class will help.
    outline: 'none',
  },
}

class Drawer extends React.Component<Props> {
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
      // eslint-disable-next-line react/no-find-dom-node
      findDOMNode(this.dialogRef)
    )
    if (innerFocusElement) {
      innerFocusElement.focus()
    }
  }

  render() {
    const {
      classes,
      className,
      open,
      onClose,
      title,
      titleClamp,
      titleSmaller,
      titleExtraButton,
      noCloseButton,
      footerButtonLabel,
      footerButtonProps,
      footerText,
      children,
    } = this.props

    const buttons = []
    if (!noCloseButton) {
      buttons.push(<DrawerCloseButton />)
    }
    if (titleExtraButton) {
      buttons.push(titleExtraButton)
    }

    let footer
    if (footerButtonLabel || footerButtonProps || footerText) {
      footer = (
        <DrawerFooter text={footerText}>
          <Button
            color="green"
            label={footerButtonLabel}
            {...footerButtonProps}
          />
        </DrawerFooter>
      )
    }

    return (
      <Modal open={open} onClose={onClose}>
        <DrawerPaper
          ref={this.handleDialogRef}
          onFocus={this.handleFocus}
          className={cx(classes.paper, className)}
        >
          <DrawerContext.Provider value={{ opened: open, close: onClose }}>
            {title && (
              <DrawerTitle
                clamp={titleClamp}
                smaller={titleSmaller}
                buttons={buttons}
              >
                {title}
              </DrawerTitle>
            )}
            {children}
            {footer}
          </DrawerContext.Provider>
        </DrawerPaper>
      </Modal>
    )
  }
}

export default injectStyles(styles)(Drawer)
