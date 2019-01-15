import React from 'react'
import { Code as IconCode } from 'material-ui-icons'
import copyToClipboard from 'clipboard-copy'
import PopoverDialog from 'components/kit/PopoverDialog/PopoverDialog'
import ToggleButton from 'components/kit/ToggleButton/ToggleButton'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  header: {
    color: '#252B43',
    ...theme.fontMedium(18, 24),
    marginBottom: 10,
  },
  code: {
    color: 'rgba(37,43,67, 0.4)',
    ...theme.fontRegular(16, 24),
  },
})

class GetCodeButton extends React.Component {
  state = { copied: false }

  handleCopy = () => {
    if (!this.state.copied) {
      copyToClipboard(this.props.codeText).then(() => {
        this.setState({ copied: true })
      })
    }
  }

  handleClose = () => {
    this.setState({ copied: false })
  }

  render() {
    const { classes, codeText } = this.props
    const { copied } = this.state

    return (
      <PopoverDialog
        width={430}
        align="end"
        cancelLabel="Dismiss"
        confirmLabel={copied ? 'Copied' : 'Copy'}
        onConfirm={this.handleCopy}
        onClose={this.handleClose}
        disableCloseOnConfirm
        button={
          <ToggleButton.Text larger label="Get the code" icon={<IconCode />} />
        }
      >
        <div className={classes.header}>
          Add this code to every page of your website
        </div>
        <div className={classes.code}>{codeText}</div>
      </PopoverDialog>
    )
  }
}

export default injectStyles(styles)(GetCodeButton)
