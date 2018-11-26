// @flow
import * as React from 'react'
import memoize from 'lodash/memoize'
import Menu from 'components/kit/Menu'
import Modal from 'components/kit/Modal'
import ArrowMenu from 'components/kit/ArrowMenu'
import PopupBase, {
  type PopupAlign,
  type PopupPosition,
  type PopupRenderProps,
  type GetAnchorPropsFn,
} from 'components/kit/PopupBase'
import unsafeFindDOMNode from 'utils/dom/unsafeFindDOMNode'
import chainCallbacks from 'utils/dom/chainCallbacks'

type Direction = PopupPosition

const REVERSE_DIRECTION: { [Direction]: Direction } = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

type Value = any // flowlint-line unclear-type:warn

type OmittedProps = {|
  onClose?: Function, // flowlint-line unclear-type:warn
|}

type getInputPropsResult = {|
  controlRef: Function,
  onBlur: Function,
  onClick: Function,
  onFocus: Function,
  onKeyDown: Function,
  tabIndex: number,
|}

type getInputPropsFn = (?Object) => getInputPropsResult

type SelectRenderProps = {|
  active: boolean,

  getInputProps: getInputPropsFn,
  open: boolean,
  select: Function,
  toggle: Function,
  value: Value,
  valueFormatted: any,
|}

type RenderControlProps = {|
  ...SelectRenderProps,
  //
  getAnchorProps: GetAnchorPropsFn,
|}

export type Props = {|
  ...OmittedProps,
  //
  align: PopupAlign,
  alignByArrow?: boolean,
  arrowAt?: PopupAlign,
  autoFocus?: boolean,
  children?: React.Node,
  defaultFocused?: boolean,
  defaultOpen?: boolean,
  defaultValue?: Value,
  direction: Direction,
  dropdownWidth?: number,
  formatValue?: Value => string,
  menuProps?: Object,
  multiple?: boolean,
  onChange?: Value => void,
  renderControl: (RenderControlProps, Object) => React.Element<any>, // TODO
  stretchDropdown?: boolean,
  value?: Value,
  values?: Array<Value>,
|}

type State = {|
  open?: boolean,
  focused: boolean,
  value?: Value,
  selectedElementText?: ?string,
|}

const memoizeRefCallback = ref =>
  memoize(handler => chainCallbacks(ref, handler))

class Select extends React.Component<Props, State> {
  static defaultProps = {
    direction: 'down',
    align: 'start',
    alignByArrow: false,
    dropdownWidth: null,
  }

  state = {
    value: this.props.defaultValue,
    open: this.props.defaultOpen,
    focused: this.props.defaultFocused,
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
    }
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isControlledValue() {
    return typeof this.props.value !== 'undefined'
  }

  getValue(state: State = this.state) {
    return this.isControlledValue ? this.props.value : state.value
  }

  getTextByValue = (value: Value) => {
    const menuItems = React.Children.toArray(this.props.children)
    const found = menuItems.find(x => x.props.value === value)

    return found && found.props.label
  }

  getRenderProps = (state: State = this.state) =>
    ({
      value: this.getValue(state),
      valueFormatted:
        typeof this.props.formatValue === 'function'
          ? this.props.formatValue(this.getValue(state))
          : this.getValue(state) && this.getTextByValue(this.getValue(state)),
      active: state.open || state.focused,
      toggle: this.handleTogglePopup,
      select: this.handleChange,
      open: state.open,
      getInputProps: (props = {}) => ({
        ...props,
        controlRef: this.handleInputRef(props.ref),
        tabIndex: 0,
        onClick: this.handleInputClick,
        onFocus: this.handleInputFocus,
        onBlur: this.handleInputBlur,
        onKeyDown: this.handleKeyDown,
      }),
    }: SelectRenderProps)

  input: any
  list: any

  handleListRef = ref => {
    this.list = ref
  }

  handleInputRef = memoizeRefCallback(ref => {
    this.input = ref
  })

  handleInputClick = () => {
    this.handleTogglePopup(true)
  }

  handleChange = (value: Value) => {
    const open = this.props.multiple ? this.state.open : false
    if (!this.isControlledValue) {
      this.setState(
        {
          value,
          open,
        },
        () => {
          if (typeof this.props.onChange === 'function') {
            this.props.onChange(value)
          }
        }
      )
    } else {
      this.setState({ open: false }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(value)
        }
      })
    }
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

  handleKeyDown = (event: KeyboardEvent) => {
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

  focus = () => {
    unsafeFindDOMNode(this.input).focus()
  }

  render() {
    const {
      direction,
      align,
      arrowAt,
      alignByArrow,
      children,
      multiple,
      distance,
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
    const defaultDistance = hasArrow ? 15 : 8

    return (
      <PopupBase
        open={this.state.open}
        onChangeOpen={this.handleTogglePopup}
        place={direction}
        align={align}
        alignByArrow={alignByArrow}
        distance={distance || defaultDistance}
      >
        {(popupState: PopupRenderProps) => {
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
              {renderControl(
                { ...this.getRenderProps(this.state), getAnchorProps },
                otherProps
              )}
              <Modal open={open} invisibleBackdrop onClose={close}>
                <MenuComponent
                  value={this.getValue(this.state)}
                  onChange={this.handleChange}
                  multiple={multiple}
                  listRef={this.handleListRef}
                  {...arrowMenuProps}
                  {...getPopupProps({
                    ...menuProps,
                    style: {
                      width:
                        // если ширина задана пропом dropdownWidth то берем ее всегда
                        open && stretchDropdown && !dropdownWidth
                          ? anchorEl.clientWidth
                          : dropdownWidth,
                      ...menuProps.style,
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
