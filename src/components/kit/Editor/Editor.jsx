import React from 'react'
import LibEditor, { ThemeProvider } from 'frank-redactor'
import theme from './theme'

const styleMap = {
  BOLD: {
    fontWeight: 500,
  },
}

const Editor = props => (
  <ThemeProvider theme={theme}>
    <LibEditor customStyleMap={styleMap} {...props} />
  </ThemeProvider>
)

export default Editor
