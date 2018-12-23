// @flow
import React from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'
import Transition from 'react-transition-group/Transition'
import { Close as CloseIcon } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'
import SnackManager from './SnackManager'
import SnackButton from './SnackButton'
import styles, { SNACK_HEIGHT } from './Snack.jss'

type SnackColor = 'blue' | 'dark'

type Props = {
  message: string,
  shown?: boolean,
  disableDismissButton?: boolean,
  viewportOffsetHorizontal?: number,
  viewportOffsetVertical?: number,
  onDismiss?: Function,
  dismissByTimeout?: ?number,
  // eslint-disable-next-line react/no-unused-prop-types
  color?: SnackColor,
}

class Snack extends React.Component<Props> {
  static defaultProps = {
    disableDismissButton: false,
    manager: new SnackManager(),
    viewportOffsetHorizontal: 10,
    viewportOffsetVertical: 10,
    dismissByTimeout: null,
    color: 'dark',
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

  #showTimeout = null
  #hideTimeout = null

  changeOrder = (order, cb) => {
    if (this.state.order !== order) {
      this.setState({ order }, cb)
    } else {
      cb()
    }
  }

  handleDismiss = () => {
    clearTimeout(this.#showTimeout)
    this.setState({ shown: false }, () => {
      this.#hideTimeout = setTimeout(
        () =>
          this.props.manager.remove(this, () => {
            if (this.props.onDismiss) {
              this.props.onDismiss()
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
          this.setState({ shown: true }, () => {
            if (this.props.dismissByTimeout) {
              this.#showTimeout = setTimeout(
                this.handleDismiss,
                this.props.dismissByTimeout
              )
            }
          }),
        100
      )
    })
  }

  render() {
    const {
      classes,
      className,
      viewportOffsetVertical,
      viewportOffsetHorizontal,
      disableDismissButton,
      message,
      onDismiss,
      shown: shownProp,
      dismissByTimeout,
      color,
      style,
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
      >
        {state => (
          <div
            className={cx(classes.root, className)}
            style={{
              ...style,
              bottom: viewportOffsetVertical,
              left: viewportOffsetHorizontal,
              ...transitionStyle(state),
            }}
            {...otherProps}
          >
            <div className={classes.message}>{message}</div>
            <div className={classes.buttons}>
              {!disableDismissButton && (
                <SnackButton
                  icon={<CloseIcon />}
                  onClick={this.handleDismiss}
                />
              )}
            </div>
          </div>
        )}
      </Transition>,
      document.body
    )
  }
}

export default injectStyles(styles)(Snack)
