import React from 'react'
import LibEditor, { ThemeProvider } from 'frank-redactor'
import theme from './theme'

const Editor = props => (
  <ThemeProvider theme={theme}>
    <LibEditor {...props} />
  </ThemeProvider>
)

export default Editor
