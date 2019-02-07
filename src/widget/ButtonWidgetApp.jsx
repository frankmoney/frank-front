import React from 'react'
import ButtonWidget from 'components/widgets/ButtonWidget'
import App from './app'

class ButtonWidgetApp extends React.Component {
  static defaultProps = {
    defaultOpen: false,
  }

  state = {
    position: this.props.position,
    open: this.props.defaultOpen,
  }

  setPosition(position) {
    if (this.state.position !== position) {
      this.setState({ position })
    }
  }

  showPopup() {
    this.handleChangeOpen(true)
  }

  handleChangeOpen = open => {
    if (this.state.open !== open) {
      this.setState({ open })
    }
  }

  render() {
    const { position, defaultOpen, ...props } = this.props

    return (
      <App>
        <ButtonWidget
          {...props}
          {...this.state}
          onChangeOpen={this.handleChangeOpen}
        />
      </App>
    )
  }
}

export default ButtonWidgetApp
