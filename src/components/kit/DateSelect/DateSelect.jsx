// @flow strict-local
import * as React from 'react'
import memoize from 'lodash/memoize'
import { format as formatDate } from 'date-fns'
import { Calendar, DateFnsUtils } from '@frankmoney/datepicker'
import Field from 'components/kit/fields/Field'
import Modal from 'components/kit/Modal'
import Paper from 'components/kit/Paper'
import PopupBase, {
  type PopupAlign,
  type PopupPosition,
  type PopupRenderProps,
} from 'components/kit/PopupBase'
import SelectFieldControl from 'components/kit/SelectField/SelectFieldControl'
import chainCallbacks from 'utils/dom/chainCallbacks'

export type DateString = Date | string // TODO: can it really be a string

type Direction = PopupPosition

type Value = DateString

type OmittedProps = {|
  children?: React.Node,
  formatValue?: Function, // flowlint-line unclear-type:warn
  onClose?: Function, // flowlint-line unclear-type:warn
  renderControl?: any, // flowlint-line unclear-type:warn
|}

type CalendarProps = {|
  style?: Object, // flowlint-line unclear-type:warn
|}

export type Props = {|
  ...OmittedProps,
  //
  align: PopupAlign,
  autoFocus?: boolean,
  calendarProps?: CalendarProps,
  className?: string,
  defaultFocused?: boolean,
  defaultOpen?: boolean,
  defaultValue?: Value,
  direction: Direction,
  format: string,
  onChange?: Value => void,
  placeholder?: string,
  value?: Value,
|}

type State = {|
  open?: boolean,
  focused?: boolean,
  value?: Value,
|}

const memoizeRefCallback = ref =>
  memoize(handler => chainCallbacks(ref, handler))

class DateSelect extends React.Component<Props, State> {
  static defaultProps = {
    direction: 'down',
    align: 'center',
    format: 'MM/DD/YYYY',
  }

  state = {
    value: this.props.defaultValue,
    focused: false,
    open: this.props.defaultOpen,
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      if (this.inputRef && typeof this.inputRef.focus === 'function') {
        this.inputRef.focus()
      }
    }
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isControlledValue() {
    return typeof this.props.value !== 'undefined'
  }

  getValue(state: State = this.state): ?Value {
    return this.isControlledValue ? this.props.value : state.value
  }

  formatValue = (value: ?Value) =>
    value ? formatDate(value, this.props.format, new Date()) : ''

  handleInputRef = memoizeRefCallback(ref => {
    this.input = ref
  })

  handleInputClick = () => {
    this.handleTogglePopup(true)
  }

  handleInputFocus = () => {
    this.setState({ focused: true })
  }

  handleInputBlur = () => {
    this.setState({ focused: false })
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleTogglePopup(true)
    }
  }

  handleChange = (value: Value) => {
    if (!this.isControlledValue) {
      this.setState(
        {
          value,
          open: false,
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

  render() {
    const {
      align,
      calendarProps = {},
      direction,
      // omit
      children,
      formatValue,
      onClose,
      renderControl,
      ...otherProps
    } = this.props

    const value = this.getValue(this.state)
    const { focused } = this.state
    const active = focused || this.state.open
    return (
      <PopupBase
        open={this.state.open}
        onChangeOpen={this.handleTogglePopup}
        place={direction}
        align={align}
        distance={8}
      >
        {(popupState: PopupRenderProps) => {
          const { open, close, getPopupProps, getAnchorProps } = popupState

          return (
            <>
              <Field
                {...getAnchorProps(otherProps)}
                focus={active}
                value={this.formatValue(value)}
              >
                <SelectFieldControl
                  active={active}
                  stretch
                  onClick={this.handleInputClick}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                  onKeyDown={this.handleKeyDown}
                />
              </Field>
              <Modal open={open} invisibleBackdrop onClose={close}>
                <Paper
                  type="tooltip"
                  disableOutline
                  {...getPopupProps({
                    ...calendarProps,
                    style: {
                      ...calendarProps.style,
                      padding: '0 5px 10px 5px',
                    },
                  })}
                >
                  <Calendar
                    utils={DateFnsUtils}
                    date={value}
                    onChange={this.handleChange}
                  />
                </Paper>
              </Modal>
            </>
          )
        }}
      </PopupBase>
    )
  }
}

export default DateSelect
