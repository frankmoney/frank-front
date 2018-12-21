import React from 'react'
import copyToClipboard from 'clipboard-copy'
import SidebarSnack from 'components/SidebarSnack'

class Copied extends React.Component {
  state = {
    snackShown: false,
    onCopy: this.handleCopy,
  }

  handleCopy = str => {
    copyToClipboard(str).then(() => {
      this.setState({ snackShown: true })
    })
  }

  handleSnackDismiss = () => {
    this.setState({ snackShown: false })
  }

  render() {
    const { children, message } = this.props
    return (
      <>
        {children({ onCopy: this.handleCopy })}
        <SidebarSnack
          shown={this.state.snackShown}
          message={message}
          dismissByTimeout={5000}
          onDismiss={this.handleSnackDismiss}
        />
      </>
    )
  }
}

export default Copied
