// @flow strict-local
import React from 'react'
import Autosuggest from 'react-autosuggest'
import AreaSpinner from 'components/AreaSpinner'
import Paper from 'components/kit/Paper'
import TextField from 'components/kit/TextField'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import SuggestMenuItem from './SuggestMenuItem'
import styles from './SuggestField.jss'
// FIXME react-autosuggest прокидывает внутри себя реф на инпут через ref
// и ref на TextField почемуто ставится в null, эта времянка форвардит реф в controlRef в который в глубине попадает HtmlInput
const ForwardInputRef = React.forwardRef((inputProps, ref) => (
  <TextField controlRef={ref} {...inputProps} />
))

type SuggestItem = {
  text: string,
  // value passed to input when suggesion is clicked, if empty `text` value will be used instead
  inputValue?: string,
  secondaryText?: string,
  data: Object,
  faint?: boolean,
  updating?: boolean,
}

type Props = {|
  ...InjectStylesProps,
  //
  searching?: boolean,
  maxSuggestionsHeight?: number,
  onRequestFetchSuggestions: string => void,
  onRequestClearSuggestions: string => void,
  onChange: string => {},
  onSelect: SuggestItem => {},
|}

class SuggestField extends React.PureComponent<Props> {
  static defaultProps = {
    value: '',
    maxSuggestionsHeight: 300,
  }

  getSuggestionValue = suggestion => suggestion.inputValue || suggestion.text

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

  handleSelect = (event, { suggestion }) => {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(suggestion)
    }
  }

  shouldRenderSuggestions = value => value.length > 1

  renderSuggestion = ({ text, secondaryText, faint }, { isHighlighted }) => (
    <SuggestMenuItem
      active={isHighlighted}
      text={text}
      secondaryText={secondaryText}
      faint={faint}
      updating={this.props.searching}
    />
  )

  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { searching } = this.props
    return (
      <Paper type="dropdown" {...containerProps}>
        {searching && <AreaSpinner size={25} />}
        {children}
      </Paper>
    )
  }

  renderInput = inputProps => <ForwardInputRef {...inputProps} />

  render() {
    const {
      classes,
      suggestions,
      suggestProps,
      value,
      ...otherProps
    } = this.props

    return (
      <Autosuggest
        theme={{
          suggestionsContainer: classes.suggestionsContainer,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
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
