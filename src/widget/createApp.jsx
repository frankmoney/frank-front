import React from 'react'
import { JssProvider } from 'react-jss'
import { ThemeProvider } from '@frankmoney/ui'
import { ThemeFontsLoader } from '@frankmoney/fonts'
import {
  GraphqlProvider,
  HttpClientProvider,
  createJss,
} from '@frankmoney/webapp'
import BaseUriContext from './BaseUriContext'

export default ({ frankTheme, httpClient, graphqlClient, baseUri }) => {
  const jss = createJss()

  return ({ children }) => (
    <JssProvider jss={jss}>
      <ThemeProvider theme={frankTheme}>
        <GraphqlProvider graphql={graphqlClient}>
          <HttpClientProvider httpClient={httpClient}>
            <BaseUriContext.Provider value={baseUri}>
              <ThemeFontsLoader>{children}</ThemeFontsLoader>
            </BaseUriContext.Provider>
          </HttpClientProvider>
        </GraphqlProvider>
      </ThemeProvider>
    </JssProvider>
  )
}
