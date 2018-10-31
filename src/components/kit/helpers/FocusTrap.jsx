/* eslint-disable react/no-find-dom-node */
// @flow
import React from 'react'
import { findDOMNode } from 'react-dom'
import createFocusTrap from 'focus-trap'

type Props = {
  returnFocusOnDeactivate?: boolean,
  escapeDeactivates?: boolean,
  clickOutsideDeactivates?: boolean,
}

class FocusTrap extends React.Component<Props> {
  static defaultProps = {
    returnFocusOnDeactivate: true,
  }

  componentDidMount() {
    // Finds the first child when a component returns a fragment.
    // https://github.com/facebook/react/blob/036ae3c6e2f056adffc31dfb78d1b6f0c63272f0/packages/react-dom/src/__tests__/ReactDOMFiber-test.js#L105
    this.node = findDOMNode(this)
    this.focusTrap = createFocusTrap(this.node, this.props)
    if (this.props.active) {
      this.focusTrap.activate()
    }

    if (this.props.paused) {
      this.focusTrap.pause()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active && !this.props.active) {
      this.focusTrap.deactivate()
    } else if (!prevProps.active && this.props.active) {
      this.focusTrap.activate()
    }

    if (prevProps.paused && !this.props.paused) {
      this.focusTrap.unpause()
    } else if (!prevProps.paused && this.props.paused) {
      this.focusTrap.pause()
    }
  }

  componentWillUnmount() {
    this.focusTrap.deactivate()
  }

  focusTrap = null

  render() {
    const { children } = this.props

    return <React.Fragment>{children}</React.Fragment>
  }
}

FocusTrap.defaultProps = {
  active: true,
  paused: false,
}

module.exports = FocusTrap
