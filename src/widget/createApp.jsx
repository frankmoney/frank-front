import React from 'react'
import { JssProvider } from 'react-jss'
import { ThemeProvider } from '@frankmoney/ui'
import { ThemeFontsLoader } from '@frankmoney/fonts'
import {
  GraphqlProvider,
  HttpClientProvider,
  createJss,
} from '@frankmoney/webapp'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import BaseUriContext from 'components/widgets/utility/BaseUriContext'

export default ({ frankTheme, httpClient, graphqlClient, baseUri }) => {
  const jss = createJss()

  let generateClassName
  if (process.env.NODE_ENV === 'production') {
    generateClassName = createGenerateClassName({
      productionPrefix: 'frnkw',
    })
  }

  return ({ children }) => (
    <JssProvider jss={jss} generateClassName={generateClassName}>
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
