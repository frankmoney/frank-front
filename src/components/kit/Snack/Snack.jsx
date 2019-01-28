// @flow
import React from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'
import Transition from 'react-transition-group/Transition'
import { injectStyles } from 'utils/styles'
import SnackManager from './SnackManager'
import styles from './Snack.jss'
import { SNACK_HEIGHT } from './SnackDumb.jss'
import SnackDumb, { type SnackDumbProps } from './SnackDumb'

type Props = {
  shown?: boolean,
  viewportOffsetHorizontal?: number,
  viewportOffsetVertical?: number,
  onDismiss?: Function,
  onDismissAnimationEnd?: Function,
  dismissByTimeout?: ?number,
  ...SnackDumbProps,
}

class Snack extends React.Component<Props> {
  static defaultProps = {
    manager: new SnackManager(),
    viewportOffsetHorizontal: 10,
    viewportOffsetVertical: 10,
    dismissByTimeout: null,
  }

  state = {
    order: 0,
    shown: false,
  }

  componentDidMount() {
    if (this.props.shown) {
      this.handleShow()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shown !== this.props.shown) {
      if (nextProps.shown) {
        this.handleShow()
      } else {
        this.handleDismiss()
      }
    }
  }

  componentWillUnmount() {
    if (this.props.shown) {
      this.props.manager.remove(this)
    }
  }

  #showTimeout = null
  #hideTimeout = null

  changeOrder = (order, cb) => {
    if (this.state.order !== order) {
      this.setState({ order }, cb)
    } else {
      cb()
    }
  }

  handleDismiss = reason => {
    clearTimeout(this.#showTimeout)
    this.setState({ shown: false, dismissReason: reason }, () => {
      this.#hideTimeout = setTimeout(
        () =>
          this.props.manager.remove(this, () => {
            if (this.props.onDismiss) {
              this.props.onDismiss(reason)
            }
          }),
        100
      )
    })
  }

  handleShow = () => {
    clearTimeout(this.#hideTimeout)

    this.props.manager.add(this, () => {
      this.#showTimeout = setTimeout(
        () =>
          this.setState({ shown: true, dismissReason: null }, () => {
            if (this.props.dismissByTimeout) {
              this.#showTimeout = setTimeout(
                () => this.handleDismiss('timeout'),
                this.props.dismissByTimeout
              )
            }
          }),
        100
      )
    })
  }

  handleDismissAnimationEnd = () => {
    if (typeof this.props.onDismissAnimationEnd === 'function') {
      this.props.onDismissAnimationEnd(this.state.dismissReason)
    }
  }

  render() {
    const {
      classes,
      className,
      viewportOffsetVertical,
      viewportOffsetHorizontal,
      onDismiss,
      shown: shownProp,
      dismissByTimeout,
      style,
      manager,
      ...otherProps
    } = this.props

    const { shown, order } = this.state

    const transitionStyle = state => ({
      transform: `translateY(${(state.startsWith('enter') ? 0 : 10) -
        order * (SNACK_HEIGHT + 6)}px)`,
      opacity: Number(state.startsWith('enter')),
    })

    return createPortal(
      <Transition
        in={shown}
        timeout={100}
        appear
        unmountOnExit
        // force reflow before enter state
        onEnter={node => node.scrollTop}
        onExited={this.handleDismissAnimationEnd}
      >
        {state => (
          <SnackDumb
            className={cx(classes.root, className)}
            style={{
              ...style,
              bottom: viewportOffsetVertical,
              left: viewportOffsetHorizontal,
              ...transitionStyle(state),
            }}
            onCloseClick={() => this.handleDismiss('close-click')}
            {...otherProps}
          />
        )}
      </Transition>,
      document.body
    )
  }
}

export default injectStyles(styles)(Snack)
