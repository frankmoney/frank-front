// @flow
import React from 'react'
import { createPortal, findDOMNode } from 'react-dom'
import Backdrop from 'components/kit/Backdrop'
import Menu from 'components/kit/Menu'
import Button from 'components/kit/Button'
import ArrowMenu from 'components/kit/ArrowMenu'
import PopupBase from 'components/kit/PopupBase'
import SelectValue from './SelectValue'

const REVERSE_DIRECTION = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export type Props = {
  direction?: 'up' | 'down',
  align?: 'start' | 'center' | 'end',
  alignByArrow?: boolean,
  arrowAt?: 'start' | 'center' | 'end',
}

const DEFAULT_WIDTH = 250

class Select extends React.Component<Props> {
  static defaultProps = {
    direction: 'down',
    align: 'center',
    alignByArrow: false,
  }

  state = {
    value: this.props.defaultValue,
    open: this.props.defaultOpen,
    focused: this.props.defaultFocused,
  }

  handleListRef = ref => {
    this.list = ref
  }

  handleInputRef = ref => {
    console.log(ref)
    this.input = ref
  }

  handleInputClick = () => {
    this.handleTogglePopup(true)
  }

  handleChange = value => {
    this.setState({
      value,
      open: this.props.multiple ? this.state.open : false,
    })
  }

  handleTogglePopup = open => {
    this.setState({ open })
  }

  handleInputFocus = () => {
    this.setState({ focused: true })
  }

  handleInputBlur = () => {
    this.setState({ focused: false })
  }

  handleKeyDown = event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault() // prefent move caret to end
      this.list.setNextActiveElement()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault() // prefent move caret to start
      this.list.setPrevActiveElement()
    } else if (event.key === 'Enter') {
      this.setState({ open: true })
    }
  }

  handleBackdropKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      this.handleTogglePopup(false)
    }
  }

  focus = () => {
    findDOMNode(this.input).focus()
  }

  getRenderProps = (state = this.state) => ({
    value: state.value,
    active: state.open || state.focused,
    toggle: this.handleTogglePopup,
    select: this.handleChange,
    getInputProps: (props = {}) => ({
      ...props,
      controlRef: this.handleInputRef,
      tabIndex: 0,
      onClick: this.handleInputClick,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur,
      onKeyDown: this.handleKeyDown,
    }),
  })

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
      // todo focus input
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open && !this.state.open) {
      this.focus()
    }
  }

  render() {
    const {
      direction,
      align,
      arrowAt,
      alignByArrow,
      children,
      multiple,
      menuProps = {},
      renderInput,
      onClose,
      ...otherProps
    } = this.props

    const hasArrow = !!arrowAt
    const MenuComponent = hasArrow ? ArrowMenu : Menu

    return (
      <PopupBase
        open={this.state.open}
        onChangeOpen={this.handleTogglePopup}
        place={direction}
        align={align}
        alignByArrow={alignByArrow}
        distance={hasArrow ? 15 : 8}
        {...otherProps}
      >
        {popupState => {
          const {
            open,
            close,
            anchorEl,
            getPopupProps,
            getArrowProps,
            getAnchorProps,
          } = popupState

          const arrowMenuProps = hasArrow
            ? {
                direction: REVERSE_DIRECTION[direction],
                align: arrowAt,
                arrowProps: hasArrow && getArrowProps(),
              }
            : {}

          return (
            <>
              {renderInput({
                getAnchorProps,
                ...this.getRenderProps(this.state),
              })}
              {open &&
                createPortal(
                  <Backdrop
                    transparent
                    onClick={close}
                    onKeyDown={this.handleBackdropKeyDown}
                  >
                    <MenuComponent
                      autoFocus
                      value={this.state.value}
                      onChange={this.handleChange}
                      multiple={multiple}
                      listRef={this.handleListRef}
                      {...arrowMenuProps}
                      {...getPopupProps({
                        ...menuProps,
                        style: {
                          ...menuProps.style,
                          width: anchorEl.clientWidth,
                        },
                      })}
                    >
                      {children}
                    </MenuComponent>
                  </Backdrop>,
                  document.body
                )}
            </>
          )
        }}
      </PopupBase>
    )
  }
}

export default Select
