import React from 'react'
import { JssProvider } from 'react-jss'
import { ThemeProvider } from '@frankmoney/ui'
import {
  GraphqlProvider,
  HttpClientProvider,
  createJss,
} from '@frankmoney/webapp'

export default ({ frankTheme, httpClient, graphqlClient }) => {
  const jss = createJss()

  return ({ children }) => (
    <JssProvider jss={jss}>
      <ThemeProvider theme={frankTheme}>
        <GraphqlProvider graphql={graphqlClient}>
          <HttpClientProvider httpClient={httpClient}>
            {children}
          </HttpClientProvider>
        </GraphqlProvider>
      </ThemeProvider>
    </JssProvider>
  )
}
