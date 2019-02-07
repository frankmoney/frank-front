// @flow strict-local
import * as React from 'react'
import copyToClipboard from 'clipboard-copy'
import Snack from 'components/kit/Snack'

type CopyFn = string => void

type ChildrenRenderer = {
  onCopy: CopyFn,
}

type Props = {|
  children?: React.StatelessFunctionalComponent<ChildrenRenderer>,
  message?: string,
|}

type State = {|
  snackShown: boolean,
  onCopy: CopyFn,
|}

class Copied extends React.Component<Props, State> {
  static defaultProps = {}

  state = {
    snackShown: false,
    onCopy: this.handleCopy,
  }

  handleCopy = (data: string) => {
    copyToClipboard(data).then(() => {
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
        {children && children({ onCopy: this.handleCopy })}
        <Snack
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
