// @flow
/* eslint-disable react/no-find-dom-node */
import React from 'react'
import { findDOMNode } from 'react-dom'
import EventListener from 'react-event-listener'
import ownerDocument from 'utils/dom/ownerDocument'

type Props = {
  /**
   * The wrapped element.
   */
  children: React.ReactNode,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: 'onClick' | 'onMouseDown' | 'onMouseUp' | false,
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: Function,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: 'onTouchStart' | 'onTouchEnd' | false,
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
class ClickAwayListener extends React.Component<Props> {
  static defaultProps = {
    mouseEvent: 'onMouseUp',
    touchEvent: 'onTouchEnd',
  }

  componentDidMount() {
    // Finds the first child when a component returns a fragment.
    // https://github.com/facebook/react/blob/036ae3c6e2f056adffc31dfb78d1b6f0c63272f0/packages/react-dom/src/__tests__/ReactDOMFiber-test.js#L105
    this.node = findDOMNode(this)
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  mounted = false

  handleClickAway = event => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return
    }

    // IE 11 support, which trigger the handleClickAway even after the unbind
    if (!this.mounted) {
      return
    }

    // The child might render null.
    if (!this.node) {
      return
    }

    const doc = ownerDocument(this.node)

    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !this.node.contains(event.target)
    ) {
      this.props.onClickAway(event)
    }
  }

  render() {
    const {
      children,
      mouseEvent,
      touchEvent,
      onClickAway,
      ...other
    } = this.props
    const listenerProps = {}
    if (mouseEvent !== false) {
      listenerProps[mouseEvent] = this.handleClickAway
    }
    if (touchEvent !== false) {
      listenerProps[touchEvent] = this.handleClickAway
    }

    return (
      <React.Fragment>
        {children}
        <EventListener target="document" {...listenerProps} {...other} />
      </React.Fragment>
    )
  }
}

export default ClickAwayListener
