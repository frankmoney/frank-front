import { createGraphqlClient, createHttpClient } from '@frankmoney/utils'
import renderInBrowser from '@frankmoney/webapp/es/client/createRender'
import createTheme from 'styles/createTheme'
import rootReducer from 'redux/rootReducer'
import rootEpic from 'redux/rootEpic'
import routes from './routes'

const csrfToken = window.__CSRF_TOKEN

const { frankTheme, muiTheme } = createTheme()

const httpClient = createHttpClient({
  url: __API_URL,
  headers: {
    'X-CSRF-Token': csrfToken,
  },
})

const graphqlClient = createGraphqlClient({
  url: __GRAPHQL_URL,
  credentials: 'include',
  mode: 'cors',
  headers: {
    'X-CSRF-Token': csrfToken,
  },
})

renderInBrowser({
  reducer: rootReducer,
  epic: rootEpic,
  frankTheme,
  muiTheme,
  routes,
  httpClient,
  graphqlClient,
})
