// @flow
import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import Autosuggest from 'react-autosuggest'
import Spinner from 'components/kit/Spinner'
import Paper from 'components/kit/Paper'
import TextField from '../kit/TextField/TextField'
import SuggestMenuItem from './SuggestMenuItem'
import styles from './SuggestField.jss'

// FIXME react-autosuggest прокидывает внутри себя реф на инпут через ref
// и ref на TextField почемуто ставится в null, эта времянка форвардит реф в controlRef в который в глубине попадает HtmlInput
const ForwardInputRef = React.forwardRef((inputProps, ref) => (
  <TextField controlRef={ref} {...inputProps} />
))

type Props = {
  onRequestFetchSuggestions: string => void,
  onRequestClearSuggestions: string => void,
  onChange: string => {},
  onSelect: SuggestItem => {},
}

class SuggestField extends React.Component<Props> {
  static defaultProps = {
    value: '',
  }

  getSuggestionValue = suggestion => suggestion

  handleChange = (event, { newValue, suggestion, method }) => {
    if (suggestion) {
      return
    }

    if (method === 'up' || method === 'down') {
      return
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue)
    }
  }

  handleSuggestionsFetchRequested = ({ value, reason }) => {
    if (reason === 'input-changed') {
      const searchValue = value.trim()
      const searchLength = searchValue.length

      if (searchLength !== 0) {
        this.props.onRequestFetchSuggestions(searchValue)
      }
    }
  }

  handleSuggestionsClearRequested = () => {
    this.props.onRequestClearSuggestions()
  }

  handleSelect = (event, { suggestion }) => {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(suggestion)
    }
  }

  shouldRenderSuggestions = value => value.length > 1

  renderSuggestion = (suggestion, { isHighlighted }) => (
    <SuggestMenuItem active={isHighlighted} {...suggestion} />
  )

  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { searching, classes } = this.props
    return (
      <Paper type="dropdown" {...containerProps}>
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

  renderInput = inputProps => <ForwardInputRef {...inputProps} />

  render() {
    const {
      classes,
      className,
      suggestions,
      suggestProps,
      value,
      ...otherProps
    } = this.props

    return (
      <Autosuggest
        theme={{
          container: className,
          suggestionsContainer: classes.suggestionsContainer,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        suggestions={suggestions}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          ...otherProps,
          value,
          onChange: this.handleChange,
        }}
        renderInputComponent={this.renderInput}
        onSuggestionSelected={this.handleSelect}
        highlightFirstSuggestion
        {...suggestProps}
      />
    )
  }
}

export default injectStyles(styles)(SuggestField)
