// @flow strict-local
import * as React from 'react'
import memoize from 'lodash/memoize'
import { Calendar, DateFnsUtils } from '@frankmoney/datepicker'
import { format as formatDate } from 'date-fns'
import Modal from 'components/kit/Modal'
import Paper from 'components/kit/Paper'
import PopupBase, {
  type PopupAlign,
  type PopupPosition,
} from 'components/kit/PopupBase'
import chainCallbacks from 'utils/dom/chainCallbacks'
import SelectFieldControl from 'components/kit/SelectField/SelectFieldControl'
import Field from '../fields/Field'

type Direction = PopupPosition

type Value = any // flowlint-line unclear-type:warn

type OmittedProps = {|
  onClose?: Function, // flowlint-line unclear-type:warn
|}

export type Props = {|
  ...OmittedProps,
  //
  align: PopupAlign,
  direction: Direction,
  defaultFocused?: boolean,
  defaultOpen?: boolean,
  defaultValue?: Value,
  autoFocus?: boolean,
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

  get isControlledValue() {
    return typeof this.props.value !== 'undefined'
  }

  getValue(state: State = this.state) {
    return this.isControlledValue ? this.props.value : state.value
  }

  formatValue = value =>
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

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleTogglePopup(true)
    }
  }

  handleChange = value => {
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
      direction,
      align,
      children,
      formatValue,
      calendarProps = {},
      renderControl,
      onClose,
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
        {popupState => {
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
