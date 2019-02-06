// @flow
import * as React from 'react'
import positionElement from 'utils/dom/positionElement'
import unsafeFindDOMNode from 'utils/dom/unsafeFindDOMNode'

type Ref = any
type RefHandler = Ref => void

type Style = Object

export type PopupArrowProps = {|
  ref: RefHandler,
  style?: Style,
|}

export type PopupAlign = 'start' | 'center' | 'end'
export type PopupPosition = 'up' | 'down' | 'left' | 'right'

export type PopupAnchorProps = {|
  ref: RefHandler,
|}

type PopupProps = {|
  ref: RefHandler,
  style?: Style,
|}

type EmptyCb = () => void
type ExternalCb = Function

type Props = {|
  align: PopupAlign,
  alignByArrow?: boolean, // в этом случае попап будет равняться стрелкой по анкору
  alignmentOffset?: number,
  children: React.StatelessFunctionalComponent<any>,
  defaultOpen: boolean,
  distance?: number,
  onClose?: EmptyCb,
  onChangeOpen?: boolean => void,
  open?: boolean,
  place: PopupPosition,
  // выключает авторепозиционирование
  disableAutoReposition?: boolean,
|}

type El = Element | Text

export type GetAnchorPropsFn = (?Object) => PopupAnchorProps
export type GetPopupPropsFn = (?Object) => PopupProps

export type PopupRenderProps = {
  open?: boolean,
  close: ExternalCb,
  show: ExternalCb,
  toggle: ExternalCb,
  toggleOpen: ExternalCb,
  toggleClose: ExternalCb,
  popupEl: ?El,
  anchorEl: ?El,
  // актуальный place если использовано авторепозиционированние
  place: PopupPosition,
  // актуальный align если использовано авторепозиционированние
  align: PopupAlign,
  getArrowProps: (?Object) => PopupArrowProps,
  getAnchorProps: GetAnchorPropsFn,
  getPopupProps: GetPopupPropsFn,
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
    disableAutoReposition: false,
  }

  state = {
    open: this.props.defaultOpen,
    anchorEl: null,
    popupEl: null,
    arrowEl: null,
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isControlled() {
    console.log('controlled', this.props.open);
    return typeof this.props.open !== 'undefined'
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isOpen() {
    return this.isControlled ? this.props.open : this.state.open
  }

  getRenderProps: getRenderPropsFn = () => {
    // при авторепозиционировании изначальные place,align могут измениться, передаем актуальные
    const { style, place, align } = this._calcPopupPosition(this.state)

    return {
      open: this.isOpen,
      close: this.close,
      show: this.open,
      toggle: this.toggle,
      toggleOpen: this.open,
      toggleClose: this.close,
      popupEl: this.state.popupEl,
      anchorEl: this.state.anchorEl,
      place,
      align,
      getArrowProps: (props = {}) => ({
        ...props,
        ref: this.handleArrowRef,
      }),
      getAnchorProps: (
        props = {},
        setAnchor = handler => ({ ref: handler })
      ) => ({
        ...props,
        ...setAnchor(this.handleAnchorRef),
      }),
      getPopupProps: (props = {}) => ({
        ...props,
        ref: this.handlePopupRef,
        style: props ? { ...style, ...props.style } : style,
      }),
    }
  }

  open = (callback: ExternalCb) => {
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

  close = (callback: ExternalCb) => {
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

  toggle = (callback: ExternalCb) => {
    if (this.isOpen) {
      this.close(callback)
    } else {
      this.open(callback)
    }
  }

  handleAnchorRef = (ref: Ref) => {
    this.setState({ anchorEl: unsafeFindDOMNode(ref) })
  }

  handleArrowRef = (ref: Ref) => {
    this.setState({ arrowEl: unsafeFindDOMNode(ref) })
  }

  handlePopupRef = (ref: Ref) => {
    this.setState({ popupEl: unsafeFindDOMNode(ref) }, () => {
      this.forceUpdate()
    })
  }

  _calcPopupPosition = (state: State) => {
    const { popupEl, anchorEl, arrowEl } = state
    const open = this.isOpen

    const { align, distance, place, alignmentOffset } = this.props
    const defaultStyles = {
      position: 'absolute',
    }

    if (!popupEl || !anchorEl || !open) {
      return { style: defaultStyles, place, align }
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

    const [placement, popupStyles] = positionElement({
      element: popupEl,
      anchorElement: anchorEl,
      arrowElement: this.props.alignByArrow ? arrowEl : null,
      preferredPlacement: `${place}-${normalizedAlign}`,
      autoReposition: !this.props.disableAutoReposition,
      alignmentOffset,
      distance,
    })

    const [resultPlace, resultAlign] = placement.split('-')

    const denormalizedAlign = resultAlign.replace('middle', 'center')

    return { style: popupStyles, place: resultPlace, align: denormalizedAlign }
  }

  render() {
    const { children } = this.props

    return children(this.getRenderProps())
  }
}

export default PopupBase
