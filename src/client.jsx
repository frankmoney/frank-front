import renderInBrowser from '@frankmoney/webapp/es/client/createRender'
import createTheme from 'styles/createTheme'
import rootReducer from 'redux/rootReducer'
import rootEpic from 'redux/rootEpic'
import routes from './routes'

const { frankTheme, muiTheme } = createTheme()

renderInBrowser({
  reducer: rootReducer,
  epic: rootEpic,
  frankTheme,
  muiTheme,
  routes,
})
