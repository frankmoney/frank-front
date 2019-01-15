import React from 'react'
import { createGraphqlClient, createHttpClient } from '@frankmoney/utils'
import createTheme from 'styles/createTheme'
import ButtonWidget from './components/ButtonWidget/ButtonWidget'
import createApp from './createApp'

const { frankTheme, muiTheme } = createTheme()

const httpClient = createHttpClient({
  url: __API_URL,
})

const graphqlClient = createGraphqlClient({
  url: __GRAPHQL_URL,
})

const baseUri = 'https://frank.ly' // FIXME

const App = createApp({
  httpClient,
  graphqlClient,
  frankTheme,
  muiTheme,
  baseUri,
})

export default props => (
  <App>
    <ButtonWidget {...props} />
  </App>
)
