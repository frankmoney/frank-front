import { createGraphqlClient, createHttpClient } from '@frankmoney/utils'
import createTheme from 'styles/createTheme'
import createApp from './createApp'

const { frankTheme, muiTheme } = createTheme()

const httpClient = createHttpClient({
  url: __API_URL,
})

const graphqlClient = createGraphqlClient({
  url: __GRAPHQL_URL,
})

const App = createApp({
  httpClient,
  graphqlClient,
  frankTheme,
  muiTheme,
  baseUri: __WEBAPP_BASE_URL,
})

export default App
