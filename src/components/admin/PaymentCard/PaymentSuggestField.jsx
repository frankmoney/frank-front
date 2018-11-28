import React from 'react'
import SuggestField from 'components/SuggestField'

class PaymentSuggestField extends React.Component {
  state = {
    searching: false,
    suggestions: [],
  }

  handleUpdateSuggest = search => {
    const formatList = list =>
      list.length === 1 && list[0].text.trim() === search.trim()
        ? list
        : [{ text: `Use “${search}”`, data: search, faint: true }, ...list]

    this.setState({
      searching: true,
    })

    this.props.querySuggestions(search).then(list =>
      this.setState({
        searching: false,
        suggestions: formatList(list),
      })
    )
  }

  handleClearSuggest = () => {
    this.setState({ suggestions: [] })
  }

  // TODO воркэраунд чтобы данный контрол работал с филдом редакс формы
  // если передать в блур event параметр(обычное поведение) то при клике на айтем в саджесте возникает ошибка
  handleBlur = () => {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur()
    }
  }

  render() {
    const { onBlur, ...props } = this.props

    return (
      <SuggestField
        {...props}
        onBlur={this.handleBlur}
        onRequestFetchSuggestions={this.handleUpdateSuggest}
        onRequestClearSuggestions={this.handleClearSuggest}
        suggestions={this.state.suggestions}
        searching={this.state.searching}
      />
    )
  }
}

export default PaymentSuggestField
