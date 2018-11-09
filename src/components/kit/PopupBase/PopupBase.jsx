// @flow
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import positionElement from 'utils/dom/positionElement'

type RefHandler = (React.ComponentType<any> | Element) => void

type ArrowProps = {|
  ref: RefHandler,
|}

type AnchorProps = {|
  ref: RefHandler,
|}

type PopupProps = {|
  ref: RefHandler,
  style: Object,
|}

type EmptyCb = () => void

type Props = {|
  align?: 'start' | 'center' | 'end',
  alignByArrow?: boolean, // в этом случае попап будет равняться стрелкой по анкору
  alignmentOffset?: number,
  children: React.StatelessFunctionalComponent<any>,
  defaultOpen: boolean,
  distance?: number,
  onClose?: EmptyCb,
  onChangeOpen?: boolean => void,
  open: boolean,
  place?: 'up' | 'down' | 'left' | 'right',
  enableViewportOffset?: boolean,
|}

type El = Element | Text

export type PopupRenderProps = {
  open: boolean,
  close: EmptyCb,
  show: EmptyCb,
  toggle: EmptyCb,
  popupEl: ?El,
  anchorEl: ?El,
  getArrowProps: Object => ArrowProps,
  getAnchorProps: Object => AnchorProps,
  getPopupProps: Object => PopupProps,
}

type getRenderPropsFn = () => PopupRenderProps

type State = {|
  anchorEl: ?El,
  arrowEl: ?El,
  open: boolean,
  popupEl: ?El,
|}

class PopupBase extends React.Component<Props, State> {
  static defaultProps = {
    place: 'down',
    align: 'center',
    defaultOpen: false,
    alignmentOffset: 0,
    offset: 0,
  }

  state = {
    open: this.props.defaultOpen,
    anchorEl: null,
    popupEl: null,
    arrowEl: null,
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isControlled() {
    return typeof this.props.open !== 'undefined'
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isOpen() {
    return this.isControlled ? this.props.open : this.state.open
  }

  getRenderProps: getRenderPropsFn = () => ({
    open: this.isOpen,
    close: this.close,
    show: this.open,
    toggle: this.toggle,
    popupEl: this.state.popupEl,
    anchorEl: this.state.anchorEl,
    getArrowProps: (props = {}) => ({
      ...props,
      ref: this.handleArrowRef,
    }),
    getAnchorProps: (props = {}) => ({
      ...props,
      ref: this.handleAnchorRef,
    }),
    getPopupProps: (props = {}) => ({
      ...props,
      ref: this.handlePopupRef,
      style: Object.assign(
        this._getPopupPositionStyles(this.state),
        props.style
      ),
    }),
  })

  open = callback => {
    if (!this.isControlled) {
      this.setState({ open: true }, () => {
        if (typeof callback === 'function') {
          callback()
        }
        if (typeof this.props.onChangeOpen === 'function') {
          this.props.onChangeOpen(this.state.open)
        }
      })
    } else if (typeof this.props.onChangeOpen === 'function') {
      this.props.onChangeOpen(true)
    }
  }

  close = callback => {
    if (!this.isControlled) {
      this.setState({ open: false }, () => {
        if (typeof this.props.onClose === 'function') {
          this.props.onClose()
        }
        if (typeof this.props.onChangeOpen === 'function') {
          this.props.onChangeOpen(this.state.open)
        }
        if (typeof callback === 'function') {
          callback()
        }
      })
    } else {
      if (typeof this.props.onClose === 'function') {
        this.props.onClose()
      }
      if (typeof this.props.onChangeOpen === 'function') {
        this.props.onChangeOpen(false)
      }
    }
  }

  toggle = callback => {
    if (this.isOpen) {
      this.close(callback)
    } else {
      this.open(callback)
    }
  }

  handleAnchorRef = ref => {
    // eslint-disable-next-line react/no-find-dom-node
    this.setState({ anchorEl: findDOMNode(ref) })
  }

  handleArrowRef = ref => {
    // eslint-disable-next-line react/no-find-dom-node
    this.setState({ arrowEl: findDOMNode(ref) })
  }

  handlePopupRef = ref => {
    // eslint-disable-next-line react/no-find-dom-node
    this.setState({ popupEl: findDOMNode(ref) }, () => {
      this.forceUpdate()
    })
  }

  _updatePopupPosition = () => {
    const popupStyles = this._getPopupPositionStyles(this.state)
    this.setState({ popupStyles })
  }

  _getPopupPositionStyles = (state: State) => {
    const { popupEl, anchorEl, arrowEl } = state
    const open = this.isOpen

    const { align, distance, place, alignmentOffset } = this.props
    const defaultStyles = {
      position: 'absolute',
    }

    if (!popupEl || !anchorEl) {
      return defaultStyles
    }

    const ALIGN_MAP_H = {
      center: 'middle',
      start: 'top',
      end: 'bottom',
    }

    const ALIGN_MAP_V = {
      center: 'center',
      start: 'left',
      end: 'right',
    }

    const normalizedAlign = (place === 'up' || place === 'down'
      ? ALIGN_MAP_V
      : ALIGN_MAP_H)[align]

    const popupStyles = open
      ? positionElement({
          element: popupEl,
          anchorElement: anchorEl,
          arrowElement: this.props.alignByArrow ? arrowEl : null,
          preferredPlacement: `${place}-${normalizedAlign}`,
          autoReposition: false,
          alignmentOffset,
          distance,
        })
      : defaultStyles

    if (open && this.props.enableViewportOffset) {
      popupStyles.top -= window.scrollY
    }

    return popupStyles
  }

  render() {
    const { children } = this.props

    return children(this.getRenderProps())
  }
}

export default PopupBase
