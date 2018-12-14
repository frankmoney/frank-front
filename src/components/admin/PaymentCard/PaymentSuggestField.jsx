import React from 'react'
import * as Rx from 'rxjs'
import SuggestField from 'components/SuggestField'

class PaymentSuggestField extends React.Component {
  static defaultProps = {
    suggestProps: {
      shouldRenderSuggestions: value => value.length > 0,
    },
    forceCurrentTextSuggestion: false,
  }

  state = {
    searching: false,
    suggestions: [],
  }

  requestFetchSubject = new Rx.Subject()

  handleUpdateSuggest = search => {
    if (!this.state.searching) {
      this.setState({
        searching: true,
      })
    }

    this.requestFetchSubject.next(search)
  }

  handleClearSuggest = () => {
    this.setState({ suggestions: [], searching: false })
  }

  // TODO воркэраунд чтобы данный контрол работал с филдом редакс формы(редакс формы ожидает в блуре евент с таргетом инпута)
  // если передать в блур event параметр(обычное поведение) то при клике на айтем в саджесте возникает ошибка
  handleBlur = () => {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur()
    }
  }

  formatList = (list, search) =>
    // если саджест единственный и соответствует текущему значению
    list.length === 1 && list[0].text.trim() === search.trim()
      ? []
      : // не показываем `use ""` когда это единственный саджест айтем, если не указан флаг forceCurrentTextSuggestion
        list.length === 0 && !this.props.forceCurrentTextSuggestion
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

  componentDidMount() {
    this.requestFetchSubject
      .debounceTime(200)
      .flatMap(search =>
        this.props.querySuggestions(search).then(list => [search, list])
      )
      .subscribe(([search, list]) => {
        this.setState({
          searching: false,
          suggestions: this.formatList(list, search),
        })
      })
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
