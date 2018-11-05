// @flow
import React, { cloneElement } from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { createPortal } from 'react-dom'
import EventListener from 'react-event-listener'
import RootRef from 'material-ui/internal/RootRef'
import Backdrop from 'components/kit/Backdrop'
import { ariaHidden, ariaHiddenSiblings } from './ariaHidden'
import ModalManager from './ModalManager'

type ModalProps = {
  invisibleBackdrop?: boolean,
  open?: boolean,
  disableCloseOnEscape?: boolean,
  onClose?: () => void,
}

const styles = {
  /* Styles applied to the root element. */
  root: {
    position: 'fixed',
    zIndex: 100,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  },
  /* Styles applied to the root element if the `Modal` has exited. */
  hidden: {
    visibility: 'hidden',
  },
}

class Modal extends React.Component<ModalProps> {
  static defaultProps = {
    backdropProps: {},
    manager: new ModalManager(),
  }

  handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    if (typeof this.props.onClose === 'function') {
      this.props.onClose()
    }
  }

  handleDocumentKeyDown = event => {
    if (event.key === 'Escape' && !this.props.disableCloseOnEscape) {
      event.preventDefault()
      event.stopPropagation()
      if (typeof this.props.onClose === 'function') {
        this.props.onClose()
      }
    }
  }

  handleModalRef = ref => {
    this.modalRef = ref
  }

  handleContentRef = ref => {
    this.contentRef = ref
  }

  focus = () => {
    if (!this.contentRef) {
      return
    }

    this.lastFocusElement = document.activeElement
    if (typeof this.contentRef.focus === 'function') {
      this.contentRef.focus()
    }
  }

  enforceFocus = () => {
    const currentActiveElement = document.activeElement

    if (!this.contentRef.contains(currentActiveElement)) {
      this.contentRef.focus()
    }
  }

  restoreLastFocus() {
    if (!this.lastFocusElement) {
      return
    }

    if (typeof this.lastFocusElement.focus === 'function') {
      this.lastFocusElement.focus()
    }

    this.lastFocus = null
  }

  handleOpen = () => {
    this.props.manager.add(this, document.body)
    this.focus()
  }

  handleClose = () => {
    this.props.manager.remove(this, document.body)
    this.restoreLastFocus()
  }

  componentDidMount() {
    this.mountNode = document.body

    if (this.props.open) {
      this.handleOpen()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open) {
      this.handleClose()
    } else if (!prevProps.open && this.props.open) {
      this.handleOpen()
    }
  }

  componentWillUnmount() {
    if (this.props.open) {
      this.handleClose()
    }
  }

  render() {
    const { open, children, invisibleBackdrop, classes, className } = this.props

    const backdropProps = invisibleBackdrop ? { transparent: true } : {}

    return (
      open &&
      createPortal(
        <>
          <EventListener
            target="document"
            onKeyDown={this.handleDocumentKeyDown}
            onFocusCapture={this.enforceFocus}
          />
          <div
            className={cx(classes.root, { [classes.hidden]: !open }, className)}
            ref={this.handleModalRef}
          >
            <Backdrop onClick={this.handleBackdropClick} {...backdropProps} />
            <RootRef rootRef={this.handleContentRef}>
              {cloneElement(React.Children.only(children), {
                tabIndex: -1,
              })}
            </RootRef>
          </div>
        </>,
        this.mountNode
      )
    )
  }
}

export default injectStyles(styles)(Modal)
