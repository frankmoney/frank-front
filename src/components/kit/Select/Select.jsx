/* eslint-disable react/no-find-dom-node */
// @flow
import React from 'react'
import { findDOMNode } from 'react-dom'
import Menu from 'components/kit/Menu'
import Modal from 'components/kit/Modal'
import ArrowMenu from 'components/kit/ArrowMenu'
import PopupBase from 'components/kit/PopupBase'

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
  dropdownWidth?: number,
  stretchDropdown?: boolean,
  formatValue: any => any,
}

const DEFAULT_WIDTH = 250

class Select extends React.Component<Props> {
  static defaultProps = {
    direction: 'down',
    align: 'start',
    alignByArrow: false,
    dropdownWidth: DEFAULT_WIDTH,
    selectedElementText: null,
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

  handleSelectElement = element => {
    this.setState({
      selectedElementText: element ? element.innerText : null,
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

  focus = () => {
    findDOMNode(this.input).focus()
  }

  getRenderProps = (state = this.state) => ({
    value: state.value,
    valueFormatted:
      typeof this.props.formatValue === 'function'
        ? this.props.formatValue(state.value)
        : state.selectedElementText,
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
      dropdownWidth,
      stretchDropdown,
      formatValue,
      menuProps = {},
      renderControl,
      onClose,
      ...otherProps
    } = this.props

    const hasArrow = !!arrowAt
    const MenuComponent = hasArrow ? ArrowMenu : Menu

    return (
      <PopupBase
        enableViewportOffset
        open={this.state.open}
        onChangeOpen={this.handleTogglePopup}
        place={direction}
        align={align}
        alignByArrow={alignByArrow}
        distance={hasArrow ? 15 : 8}
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
              {renderControl({
                ...otherProps,
                getAnchorProps,
                ...this.getRenderProps(this.state),
              })}
              <Modal open={open} invisibleBackdrop onClose={close}>
                <MenuComponent
                  value={this.state.value}
                  onChange={this.handleChange}
                  onSelectElement={!formatValue && this.handleSelectElement}
                  multiple={multiple}
                  listRef={this.handleListRef}
                  {...arrowMenuProps}
                  {...getPopupProps({
                    ...menuProps,
                    style: {
                      ...menuProps.style,
                      width:
                        open && stretchDropdown
                          ? anchorEl.clientWidth
                          : dropdownWidth,
                    },
                  })}
                >
                  {children}
                </MenuComponent>
              </Modal>
            </>
          )
        }}
      </PopupBase>
    )
  }
}

export default Select
