import React from 'react'
import SuggestField from 'components/SuggestField'

class PaymentSuggestField extends React.Component {
  static defaultProps = {
    suggestProps: {
      shouldRenderSuggestions: () => true,
    },
    forceCurrentTextSuggestion: false,
  }

  state = {
    searching: false,
    suggestions: [],
  }

  handleUpdateSuggest = search => {
    const formatList = list =>
      // если саджест единственный и соответствует текущему значению
      list.length === 1 && list[0].text.trim() === search.trim()
        ? []
        : list.length === 0 && !this.props.forceCurrentTextSuggestion
          ? list
          : [
              {
                text: `Use “${search}”`,
                inputValue: search,
                data: search,
                faint: true,
              },
              ...list,
            ]

    this.setState({
      searching: true,
    })

    this.props.querySuggestions(search).then(list => {
      this.setState({
        searching: false,
        suggestions: formatList(list),
      })
    })
  }

  handleClearSuggest = () => {
    this.setState({ suggestions: [] })
  }

  // TODO воркэраунд чтобы данный контрол работал с филдом редакс формы(редакс формы ожидает в блуре евент с таргетом инпута)
  // если передать в блур event параметр(обычное поведение) то при клике на айтем в саджесте возникает ошибка
  handleBlur = () => {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur()
    }
  }

  render() {
    const { onBlur, suggestProps, ...props } = this.props

    return (
      <SuggestField
        {...props}
        onBlur={this.handleBlur}
        onRequestFetchSuggestions={this.handleUpdateSuggest}
        onRequestClearSuggestions={this.handleClearSuggest}
        suggestions={this.state.suggestions}
        searching={this.state.searching}
        suggestProps={suggestProps}
      />
    )
  }
}

export default PaymentSuggestField
