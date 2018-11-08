// @flow
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import EventListener from 'react-event-listener'
import Menu from 'components/kit/Menu'
import ArrowMenu from 'components/kit/ArrowMenu'
import PopupBase from 'components/kit/PopupBase'
import ClickAwayListener from 'components/kit/helpers/ClickAwayListener'
import FocusTrap from 'components/kit/helpers/FocusTrap'
import createPortalInBody from 'utils/dom/createPortal'

const REVERSE_DIRECTION = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

type Value = any // FIXME

export type Props = {|
  align?: 'start' | 'center' | 'end',
  alignByArrow?: boolean,
  arrowAt?: 'start' | 'center' | 'end',
  autoFocus?: boolean,
  children?: React.Node,
  defaultFocused?: boolean,
  defaultOpen?: boolean,
  defaultValue?: Value,
  direction?: 'up' | 'down',
  dropdownWidth?: number,
  formatValue: Value => any,
  stretchDropdown?: boolean,
|}

type State = {|
  open?: boolean,
  focused?: boolean,
  value?: Value,
  selectedElementText?: ?string,
|}

const DEFAULT_WIDTH = 250

class Select extends React.Component<Props, State> {
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

  getRenderProps = (state: State = this.state) => ({
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

  handleTogglePopup = (open: boolean) => {
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
      event.preventDefault() // prevent move caret to end
      this.list.setNextActiveElement()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault() // prevent move caret to start
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
    // eslint-disable-next-line react/no-find-dom-node
    console.log(findDOMNode(this.input))
    // eslint-disable-next-line react/no-find-dom-node
    findDOMNode(this.input).focus()
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.open !== this.state.open && !this.state.open) {
      console.log('return focus')
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
              {open &&
                createPortalInBody(
                  <ClickAwayListener onClickAway={close}>
                    <FocusTrap>
                      <MenuComponent
                        autoFocus
                        value={this.state.value}
                        onChange={this.handleChange}
                        onSelectElement={
                          !formatValue && this.handleSelectElement
                        }
                        multiple={multiple}
                        listRef={this.handleListRef}
                        {...arrowMenuProps}
                        {...getPopupProps({
                          ...menuProps,
                          style: {
                            ...menuProps.style,
                            width: stretchDropdown
                              ? anchorEl.clientWidth
                              : dropdownWidth,
                          },
                        })}
                      >
                        {children}
                      </MenuComponent>
                    </FocusTrap>
                    <EventListener
                      target="document"
                      onKeyDown={this.handleBackdropKeyDown}
                    />
                  </ClickAwayListener>
                )}
            </>
          )
        }}
      </PopupBase>
    )
  }
}

export default Select
