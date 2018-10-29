/* eslint-disable react/no-find-dom-node */
// @flow
import React from 'react'
import { findDOMNode } from 'react-dom'
import positionElement from 'utils/dom/positionElement'

type RefHandler = (React.ComponentType | Element) => void

type ArrowProps = {
  ref: RefHandler,
}

type AnchorProps = {
  ref: RefHandler,
}

type PopupProps = {
  ref: RefHandler,
  style: Object,
}

export type Props = {
  defaultOpen?: boolean,
  open?: boolean,
  place?: 'up' | 'down' | 'left' | 'right',
  align?: 'start' | 'center' | 'end',
  distance?: number,
  alignmentOffset?: number,
  onClose: () => void,
}

export type RenderProps = {
  open: boolean,
  close: () => void,
  show: () => void,
  toggle: () => void,
  popupEl: Element,
  anchorEl: Element,
  getArrowProps: Object => ArrowProps,
  getAnchorProps: Object => AnchorProps,
  getPopupProps: Object => PopupProps,
}

type getRenderPropsFn = () => RenderProps

class PopupBase extends React.Component<Props> {
  static defaultProps = {
    place: 'down',
    align: 'center',
    defaultOpen: false,
    alignmentOffset: 0,
    offset: 0,
  }

  get isControlled() {
    return typeof this.props.open !== 'undefined'
  }

  get isOpen() {
    return this.isControlled ? this.props.open : this.state.open
  }

  open = callback => {
    if (!this.isControlled) {
      this.setState({ open: true }, () => {
        if (typeof callback === 'function') {
          callback()
        }
      })
    }
  }

  close = callback => {
    if (!this.isControlled) {
      this.setState({ open: false }, () => {
        if (typeof this.props.onClose === 'function') {
          this.props.onClose()
        }
        if (typeof callback === 'function') {
          callback()
        }
      })
    }
  }

  toggle = callback => {
    if (!this.isControlled) {
      if (this.isOpen) {
        this.close(callback)
      } else {
        this.open(callback)
      }
    }
  }

  state = {
    open: this.props.defaultOpen,
    anchorEl: null,
    popupEl: null,
    arrowEl: null,
  }

  handleAnchorRef = ref => {
    this.setState({ anchorEl: findDOMNode(ref) })
  }

  handleArrowRef = ref => {
    this.setState({ arrowEl: findDOMNode(ref) })
  }

  handlePopupRef = ref => {
    this.setState({ popupEl: findDOMNode(ref) }, () => {
      this.forceUpdate()
    })
  }

  _updatePopupPosition = () => {
    const popupStyles = this._getPopupPositionStyles(this.state)
    this.setState({ popupStyles })
  }

  _getPopupPositionStyles = state => {
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
          arrowElement: arrowEl,
          preferredPlacement: `${place}-${normalizedAlign}`,
          autoReposition: false,
          alignmentOffset,
          distance,
        })
      : defaultStyles

    return popupStyles
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

  render() {
    const { children } = this.props

    return children(this.getRenderProps())
  }
}

export default PopupBase
