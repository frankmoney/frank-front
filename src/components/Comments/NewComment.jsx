// @flow
import * as React from 'react'
import cx from 'classnames'
import CancelIcon from 'material-ui-icons/Cancel'
import { TextField } from '@frankmoney/components'
import { IconPlainButton, TextButton } from 'components/kit/Button'
import TextTooltip from 'components/kit/TextTooltip'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import CommentBase from './CommentBase'
import AtIcon from './IconAt.svg'

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
    // visibility: 'hidden',
    width: 120,
  },
  visible: {
    // visibility: 'unset',
  },
})

type CommentText = string

type User = { picture: string } // move out

type Props = {|
  ...InjectStylesProps,
  //
  key?: React.Key,
  onSend: CommentText => void,
  user: User,
|}

type State = {|
  focus: boolean,
  value: CommentText,
|}

class NewComment extends React.Component<Props, State> {
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
              color="gray"
              larger
              onClick={this.handleSend}
            />
            {/* TODO: make darker version? */}
            <TextTooltip text="Mention" place="up" align="center">
              <IconPlainButton icon={<AtIcon />} />
            </TextTooltip>
            <TextTooltip text="Cancel" place="up" align="center">
              <IconPlainButton
                icon={<CancelIcon />}
                onClick={this.handleCancel}
              />
            </TextTooltip>
          </div>
        </div>
      </CommentBase>
    )
  }
}

export default injectStyles(styles)(NewComment)
