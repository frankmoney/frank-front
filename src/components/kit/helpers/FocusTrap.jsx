// @flow strict-local
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import createFocusTrap from 'focus-trap'

type Options = Object // flowlint-line unclear-type:off

interface OriginalFocusTrap {
  activate(activateOptions?: Options): void;
  deactivate(deactivateOptions?: Options): void;
  pause(): void;
  unpause(): void;
}

type Props = {|
  children?: React.Node,
  active: boolean,
  paused: boolean,
|}

class FocusTrap extends React.Component<Props> {
  static defaultProps = {
    active: true,
    paused: false,
    returnFocusOnDeactivate: true,
  }

  componentDidMount() {
    // Finds the first child when a component returns a fragment.
    // https://github.com/facebook/react/blob/036ae3c6e2f056adffc31dfb78d1b6f0c63272f0/packages/react-dom/src/__tests__/ReactDOMFiber-test.js#L105
    const node = findDOMNode(this) // eslint-disable-line react/no-find-dom-node
    this.focusTrap = createFocusTrap(node, this.props)
    if (this.props.active) {
      this.focusTrap.activate()
    }

    if (this.props.paused) {
      this.focusTrap.pause()
    }
  }

  componentDidUpdate(prevProps: Props) {
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

  focusTrap: OriginalFocusTrap

  render() {
    const { children } = this.props

    return <React.Fragment>{children}</React.Fragment>
  }
}

module.exports = FocusTrap
