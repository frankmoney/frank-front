import React from 'react'
import cx from 'classnames'
import { Edit as IconEditText } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import * as R from 'ramda'

const mapWithIndex = R.addIndex(R.map)

const styles = {
  container: {},
  static: {
    width: '100%',
    pointerEvents: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    wordBreak: 'break-word',
    alignItems: 'baseline',
    whiteSpace: 'pre-wrap',
  },

  input: {
    width: '100%',
    pointerEvents: 'auto',
    resize: 'none',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    padding: 0,
    margin: 0,
    outline: 'none',
    border: 0,
    '&::placeholder': {
      color: '#B7BAC2',
    },
  },
  hidden: {
    display: 'none',
    pointerEvents: 'none',
  },
  icon: {
    cursor: 'pointer',
    fontSize: 'inherit',
    width: '0.7em',
    height: '0.7em',
    fill: 'rgba(37, 43, 67, 0.2)',
    '&:hover': {
      fill: '#484DE7',
    },
  },
}

const splitIntoSymbolsIfExtendLimit = R.curryN(2, (limit, word) =>
  R.ifElse(
    input => input.length <= limit,
    R.pair(R.__, ' '),
    R.pipe(
      R.split(''),
      R.append(' ')
    )
  )(word)
)

// If name consists of words we should split into words block - for correct position of editing button
// But if last word is long we have to split it into symbols block
const splitText = (value, limit) =>
  R.ifElse(
    R.test(/\s/), // test if there are spaces in name
    R.pipe(
      R.split(' '),
      R.splitAt(-1), // split array of words into two array [[...other], [last]]
      R.converge(R.concat, [
        R.pipe(
          R.head, // parse [...other]
          R.chain(string => `${string} `)
        ),
        R.pipe(
          R.tail, // parse [last]
          R.join(''),
          splitIntoSymbolsIfExtendLimit(limit)
        ),
      ])
    ),
    splitIntoSymbolsIfExtendLimit(limit)
  )(value)

class TextWithEditableToggle extends React.PureComponent {
  state = { newValue: '', editing: false }

  componentDidUpdate() {
    if (this.state.editing) {
      this.inputRef.focus()
    }
  }

  handleToggleEdit = () => {
    this.setState({
      editing: true,
      height: this.textRef.getBoundingClientRect().height,
    })
  }

  handleReset = () => {
    this.setState({
      editing: false,
      newValue: '',
      height: 'initial',
    })
  }

  handleSubmitOrReset = event => {
    if (event.key === 'Escape') {
      this.handleReset()
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      if (this.props.onChange) {
        this.props.onChange(this.state.newValue)
        this.handleReset()
      }
    }
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ newValue: value, height: this.inputRef.scrollHeight })
  }

  render() {
    const { classes, className, value } = this.props
    const { newValue, editing, height } = this.state

    // Even while textarea have same height as static block in chrome
    // it adds some additional glitch height (~10px) to it's container

    return (
      <div className={cx(classes.container, className)} style={{ height }}>
        <div
          ref={element => {
            this.textRef = element
          }}
          className={cx(classes.static, editing && classes.hidden)}
        >
          {mapWithIndex(
            (string, idx) => <span key={`${string}-${idx}`}>{string}</span>,
            splitText(value, 18)
          )}
          <IconEditText
            className={classes.icon}
            onClick={this.handleToggleEdit}
          />
        </div>
        <textarea
          ref={element => {
            this.inputRef = element
          }}
          style={{ height }}
          className={cx(classes.input, !editing && classes.hidden)}
          value={newValue}
          placeholder={value}
          onKeyDown={this.handleSubmitOrReset}
          onBlur={this.handleCancel}
          onChange={this.handleInputChange}
        />
      </div>
    )
  }
}

export default injectStyles(styles)(TextWithEditableToggle)
