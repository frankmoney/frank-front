// @flow
import React, { cloneElement } from 'react'
import cx from 'classnames'
import { createPortal } from 'react-dom'
import EventListener from 'react-event-listener'
import RootRef from 'material-ui/internal/RootRef'
import Backdrop from 'components/kit/Backdrop'
import getNextFocusElement from 'utils/dom/getNextFocusElement'
import { injectStyles } from 'utils/styles'
import ModalManager from './ModalManager'

export type ModalProps = {
  invisibleBackdrop?: boolean,
  open?: boolean,
  noBackdrop?: boolean,
  // выключает фокус-трап
  disableEnforceFocus?: boolean,
  disableCloseOnEscape?: boolean,
  disableAutoFocus?: boolean,
  disableBackdropClick?: boolean,
  // фокус будет проваливаться на первый активный элемент внутри модала
  fallInsideFocus?: boolean,
  onClose?: () => void,
  onEscapeKeyDown?: Event => void,
  onBackdropClick?: Event => void,
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
    disableEnforceFocus: false,
    disableBackdropClick: false,
    disableCloseOnEscape: false,
    fallInsideFocus: false,
    manager: new ModalManager(),
  }

  componentDidMount() {
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

  // flowlint-next-line unsafe-getters-setters:off
  get isTopModal() {
    return this.props.manager.isTopModal(this)
  }

  mountNode = document.body

  handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (this.props.onBackdropClick) {
      this.props.onBackdropClick(event)
    }

    if (
      !this.disableBackdropClick &&
      typeof this.props.onClose === 'function'
    ) {
      this.props.onClose()
    }
  }

  handleDocumentKeyDown = event => {
    if (this.isTopModal && event.key === 'Escape' && !event.defaultPrevented) {
      if (typeof this.props.onEscapeKeyDown === 'function') {
        this.props.onEscapeKeyDown(event)
      }

      if (
        !this.props.disableCloseOnEscape &&
        typeof this.props.onClose === 'function'
      ) {
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

    if (this.props.fallInsideFocus && getNextFocusElement(this.contentRef)) {
      getNextFocusElement(this.contentRef).focus()
    } else {
      if (typeof this.contentRef.getAttribute('tabindex') === 'undefined') {
        this.contentRef.setAttribute('tabindex', -1)
      }
      this.contentRef.focus()
    }
  }

  enforceFocus = () => {
    if (this.props.disableEnforceFocus) {
      return
    }

    if (!this.isTopModal) {
      return
    }

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
    if (!this.props.disableAutoFocus) {
      this.focus()
    }
  }

  handleClose = () => {
    this.props.manager.remove(this, document.body)
    this.restoreLastFocus()
  }

  render() {
    const {
      open,
      children,
      invisibleBackdrop,
      noBackdrop,
      classes,
      className,
    } = this.props

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
            className={cx(
              classes.root,
              'ui-fixed',
              { [classes.hidden]: !open },
              className
            )}
            ref={this.handleModalRef}
          >
            {!noBackdrop && (
              <Backdrop onClick={this.handleBackdropClick} {...backdropProps} />
            )}
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
