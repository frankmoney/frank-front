import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { Spinner } from '@frankmoney/components'
import Autosuggest from 'react-autosuggest'
import { Field } from 'components/Field'
import TextBox from 'components/TextBox'
import SuggestMenuItem from './SuggestMenuItem'

const styles = {
  suggestionsContainer: {
    position: 'absolute',
    marginTop: 10,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    border: '1px solid rgba(0,0,0,0.1)',
    boxShadow: '0 5px 10px 0 rgba(0,0,0,0.15)',
    zIndex: 1000,
    display: 'none',
  },
  suggestionsContainerOpen: {
    display: 'block',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  spinner: {
    width: 25,
    height: 25,
    margin: [10, 0],
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  field: {
    width: '100%',
  },
  input: {
    display: 'flex',
  },
  textBox: {
    flex: 'auto',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  },
}

const returnsTrue = R.always(true)

function renderInput(inputProps) {
  const { classes, title, hint, onFocus, onBlur, ...textBoxProps } = inputProps
  return (
    <Field
      className={classes.field}
      title={title}
      hint={hint}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <TextBox className={classes.textBox} {...textBoxProps} />
    </Field>
  )
}

class SuggestField extends React.Component {
  state = {
    suggestions: [],
    inputValue: this.props.value,
  }

  componentWillReceiveProps(nextProps) {
    const { suggestions, suggestKeyName } = nextProps
    const { inputValue } = this.state

    this.setState({
      suggestions:
        // restrict user from creating new object with same key value
        R.ifElse(
          R.both(
            // if there is one suggestion
            R.pipe(
              R.length,
              R.equals(1)
            ),
            // and it has same key value as input value
            R.pipe(
              R.head,
              R.propEq(suggestKeyName, inputValue)
            )
          ),
          array => array,
          // otherwise add item with new object suggestion
          R.prepend({ [suggestKeyName]: inputValue })
        )(suggestions),
    })
  }

  handleChange = (event, { newValue, suggestion, method }) => {
    console.log('handleChange', event, newValue)
    if (suggestion) {
      return
    }
    if (method === 'up' || method === 'down') {
    }
    this.setState({ inputValue: newValue })
  }

  handleSuggestionsFetchRequested = ({ value, reason }) => {
    console.log('handleSuggestionsFetchRequested')
    if (reason === 'input-changed') {
      const { getSuggestions } = this.props

      const searchValue = value.trim()
      const searchLength = searchValue.length

      if (searchLength !== 0) {
        getSuggestions(searchValue)
      }
    }
  }

  handleSuggestionsClearRequested = () => {
    console.log('handleSuggestionsClearRequested')
    this.setState({
      suggestions: [],
    })
  }

  handleSelect = (event, { suggestion }) => {
    this.props.onSelect(suggestion)
  }

  handleFocus = event => {
    console.log('SF - handleFocus')
  }

  handleBlur = event => {
    console.log('SF - handleBlur')
  }

  getSuggestionValue = suggestion => {
    const { suggestKeyName } = this.props
    return R.prop(suggestKeyName)(suggestion)
  }

  renderSuggestion = (suggestion, { isHighlighted }) => {
    const { suggestKeyName } = this.props
    const suggestProps = suggestion.id
      ? { text: suggestion[suggestKeyName], count: suggestion.count }
      : { template: suggestion[suggestKeyName], count: 0 }

    return <SuggestMenuItem selected={isHighlighted} {...suggestProps} />
  }

  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { searching, classes } = this.props
    return (
      <div {...containerProps}>
        {searching ? (
          <div className={classes.spinnerContainer}>
            <Spinner className={classes.spinner} />
          </div>
        ) : (
          children
        )}
      </div>
    )
  }

  render() {
    const {
      classes,
      autoFocus,
      onSelect,
      onBlur,
      value,
      title,
      hint,
      placeholder,
      expand,
      className,
      ...otherProps
    } = this.props

    const { inputValue } = this.state

    return (
      <Autosuggest
        {...otherProps}
        theme={{
          container: className,
          suggestionsContainer: classes.suggestionsContainer,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        suggestions={this.state.suggestions}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          classes,
          placeholder,
          title,
          hint,
          expand,
          value: inputValue,
          onChange: this.handleChange,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
        }}
        renderInputComponent={renderInput}
        onSuggestionSelected={this.handleSelect}
        highlightFirstSuggestion
        shouldRenderSuggestions={() => inputValue.length > 0}
        focusInputOnSuggestionClick={false}
      />
    )
  }
}

SuggestField.propTypes = {
  autoFocus: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default injectStyles(styles)(SuggestField)
