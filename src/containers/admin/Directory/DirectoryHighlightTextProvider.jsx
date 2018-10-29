import React from 'react'
import { connect } from 'react-redux'
import HighlightTextProvider from 'components/HighlightText/HighlightTextProvider'
// нужно было создать враппер так ак React.Context.Provider почемуто не коннектится к редаксу напрямую
import { searchTextSelector } from './selectors'

const ContextProviderHackWrap = ({ value, children }) => (
  <HighlightTextProvider value={value}>{children}</HighlightTextProvider>
)
export default connect(
  state => ({
    value: searchTextSelector(state),
  }),
  null
)(ContextProviderHackWrap)
