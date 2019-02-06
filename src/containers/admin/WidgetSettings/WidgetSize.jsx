import React from 'react'
import defaults from 'lodash/defaults'
import ArrowPopup from 'components/ArrowPopup'
import { injectStyles } from 'utils/styles'
import TextField from 'components/kit/TextField'
import WidgetSizeButton from './WidgetSizeButton'

const styles = theme => ({
  popup: {
    width: 210,
    padding: 20,
  },
  wrap: {
    display: 'flex',
  },
  field: {
    width: 75,
    '&:first-child': {
      marginRight: 20,
    },
  },
})

class WidgetSize extends React.Component {
  state = {
    width: this.props.initialWidth,
    height: this.props.initialHeight,
    open: false,
  }

  handleClose = () => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange({
        width: parseInt(this.state.width || this.props.initialWidth, 10),
        height: parseInt(this.state.height || this.props.initialHeight, 10),
      })
    }
  }

  handleOpen = open => {
    this.setState({ open }, () => {
      if (!open) {
        this.handleClose()
      }
    })
  }

  handleWidthChange = event => {
    this.setState({ width: event.target.value })
  }

  handleHeightChange = event => {
    this.setState({ height: event.target.value })
  }

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.handleOpen(false)
    }
  }

  render() {
    const { classes, className, initialWidth, initialHeight } = this.props

    const { open, width, height } = this.state
    return (
      <ArrowPopup
        className={classes.popup}
        align="center"
        open={open}
        onChangeOpen={this.handleOpen}
        button={
          <WidgetSizeButton
            width={initialWidth}
            height={initialHeight}
            className={className}
          />
        }
      >
        <div className={classes.wrap}>
          <TextField
            autoFocus
            className={classes.field}
            label="Width"
            placeholder={initialWidth}
            numeric
            value={width}
            onChange={this.handleWidthChange}
            onKeyDown={this.handleKeyDown}
          />
          <TextField
            className={classes.field}
            label="Height"
            placeholder={initialHeight}
            numeric
            value={height}
            onChange={this.handleHeightChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </ArrowPopup>
    )
  }
}

export default injectStyles(styles)(WidgetSize)
