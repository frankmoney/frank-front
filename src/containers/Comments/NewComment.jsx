import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { Cancel as IconCancel } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import {
  IconButton,
  TextButton,
  TextField,
  Tooltip,
} from '@frankmoney/components'
import CommentBase from './CommentBase'
import IconAt from './IconAt.svg'

const styles = theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    left: 3,
    position: 'relative',
    top: 4,
  },
  textField: {
    flex: 1,
  },
  input: {
    ...theme.fontRegular(18, 26),
    color: '#646879',
    '&::placeholder': {
      color: '#B7BAC2',
    },
  },
  buttons: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'space-between',
    position: 'relative',
    right: 2,
    top: -3,
    visibility: 'hidden',
    width: 120,
  },
  visible: {
    visibility: 'unset',
  },
  buttonSend: {
    ...theme.fontMedium(18, 26),
    color: '#7A7DE7',
    textTransform: 'none',
    '&:hover, &:active': {
      color: theme.colors.blue,
    },
  },
  buttonMention: {},
  buttonCancel: {},
})

class NewComment extends React.Component {
  propTypes = {
    onSend: PropTypes.func.isRequired,
  }

  state = {
    focus: false,
    value: '',
  }

  handleFocus = () => this.setState({ focus: true })

  handleBlur = () => this.setState({ focus: false })

  handleChange = e => this.setState({ value: e.currentTarget.value })

  handleCancel = () => this.setState({ value: '' })

  handleSend = () => {
    this.props.onSend(this.state.value)
    this.setState({ value: '' })
  }

  render() {
    const { classes, className, key, user } = this.props
    const buttonsVisible = this.state.focus || this.state.value
    return (
      <CommentBase className={className} key={key} picture={user.picture}>
        <div className={classes.root}>
          <TextField
            className={cx(classes.textField, classes.input)}
            placeholder="Leave a comment…"
            value={this.state.value}
            InputProps={{
              disableUnderline: true,
              classes: { root: classes.input },
            }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
          <div
            className={cx(classes.buttons, {
              [classes.visible]: buttonsVisible,
            })}
          >
            <TextButton
              label="Send"
              onClick={this.handleSend}
              className={classes.buttonSend}
            />
            <Tooltip text="Mention" placement="top">
              <IconButton icon={IconAt} className={classes.buttonMention} />
            </Tooltip>
            <Tooltip text="Cancel" placement="top">
              <IconButton
                icon={IconCancel}
                className={classes.buttonCancel}
                onClick={this.handleCancel}
              />
            </Tooltip>
          </div>
        </div>
      </CommentBase>
    )
  }
}

export default injectStyles(styles)(NewComment)
