import React from 'react'
import { format, parse } from 'date-fns'
import Field from 'components/kit/fields/Field'
import TextBox from 'components/kit/TextBox'
import DateSelect from './DateSelect'

class TextDateSelect extends React.Component {
  static defaultProps = {
    format: 'MM/DD/YYYY',
  }

  state = {
    calendarValue: new Date(),
    inputValue: '',
  }

  handleCalendarChange = date => {
    this.setState({
      calendarValue: date,
      inputValue: format(date, this.props.format),
    })
  }

  handleInputChange = value => {
    let date = parse(
      value,
      this.props.format,
      this.state.calendarValue || new Date()
    )
    if (isNaN(date.valueOf())) {
      date = this.state.calendarValue
    }

    this.setState({ inputValue: value, calendarValue: date })
  }

  renderControl = ({
    getAnchorProps,
    active,
    getInputProps,
    //
    value,
    placeholder,
    larger,
    error,
    hint,
    label,
    floatingLabel,
    additionalLabel,
    disabled,
    loading,
    loadingText,
  }) => (
    <Field
      value={this.state.inputValue}
      placeholder={placeholder}
      larger={larger}
      error={error}
      hint={hint}
      label={label}
      floatingLabel={floatingLabel}
      additionalLabel={additionalLabel}
      disabled={disabled}
      loading={loading}
      loadingText={loadingText}
      {...getAnchorProps()}
      focus={active}
      onChange={this.handleInputChange}
    >
      <TextBox {...getInputProps()} />
    </Field>
  )

  render() {
    const {
      format,
      renderControl,
      openOnFocus,
      value,
      onChange,
      ...otherProps
    } = this.props

    return (
      <DateSelect
        openOnFocus
        renderControl={this.renderControl}
        value={this.state.calendarValue}
        onChange={this.handleCalendarChange}
        {...otherProps}
      />
    )
  }
}

export default TextDateSelect
