import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import Autosuggest from 'react-autosuggest'
import Spinner from 'components/kit/Spinner'
import Paper from 'components/kit/Paper'
import TextField from '../kit/TextField/TextField'
import SuggestMenuItem from './SuggestMenuItem'

const styles = {
  suggestionsContainer: {
    position: 'absolute',
    marginTop: 10,
    left: 0,
    right: 0,
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
}

function renderInput(inputProps) {
  const {
    ref,
    value,
    onFocus,
    onBlur,
    onKeyDown,
    onChange,
    ...otherProps
  } = inputProps
  return (
    <TextField
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      {...otherProps}
    />
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

  getSuggestionValue = suggestion => {
    const { suggestKeyName } = this.props
    return R.prop(suggestKeyName)(suggestion)
  }

  handleChange = (event, { newValue, suggestion, method }) => {
    if (suggestion) {
      return
    }
    if (method === 'up' || method === 'down') {
      return
    }
    this.setState({ inputValue: newValue })
  }

  handleSuggestionsFetchRequested = ({ value, reason }) => {
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
    this.setState({
      suggestions: [],
    })
  }

  handleSelect = (event, { suggestion }) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(suggestion)
    }
  }

  handleFocus = event => {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event)
    }
  }

  handleBlur = event => {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }

  renderSuggestion = (suggestion, { isHighlighted }) => {
    const { suggestKeyName } = this.props
    const suggestProps = suggestion.id
      ? {
          text: suggestion[suggestKeyName],
          count: suggestion.count,
          suggested: suggestion.suggested,
        }
      : { text: suggestion[suggestKeyName] }

    return <SuggestMenuItem active={isHighlighted} {...suggestProps} />
  }

  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { searching, classes } = this.props
    return (
      <Paper {...containerProps}>
        {searching ? (
          <div className={classes.spinnerContainer}>
            <Spinner className={classes.spinner} />
          </div>
        ) : (
          children
        )}
      </Paper>
    )
  }

  render() {
    const {
      classes,
      className,
      // TODO correct prop resting
      // TEXTFIELD PROPS
      onChange,
      onFocus,
      onBlur,
      value,
      placeholder,
      larger,
      error,
      hint,
      label,
      floatingLabel,
      additionalLabel,
      focus,
      disabled,
      loading,
      loadingText,
      multiLine,
      stretch,
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
          larger,
          error,
          hint,
          label,
          floatingLabel,
          additionalLabel,
          focus,
          disabled,
          loading,
          loadingText,
          multiLine,
          stretch,
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

export default injectStyles(styles)(SuggestField)
