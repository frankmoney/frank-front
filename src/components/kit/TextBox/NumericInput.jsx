import React from 'react'

const validateNumber = event => {
  const keyCode = event.keyCode || event.which
  // del or backspace or minus
  if (keyCode === 8 || keyCode === 46 || keyCode === 45) {
    return true
  } else if (keyCode < 48 || keyCode > 57) {
    return false
  }
  return true
}

class NumericInput extends React.Component {
  // eslint-disable-next-line consistent-return
  handleKeyPress = event => {
    if (validateNumber(event)) {
      if (typeof this.props.onKeyPress === 'function') {
        return this.props.onKeyPress(event)
      }
    } else {
      event.preventDefault()
      return false
    }
  }

  render() {
    const { onKeyPress, ...props } = this.props
    return <input onKeyPress={this.handleKeyPress} {...props} />
  }
}

export default NumericInput
