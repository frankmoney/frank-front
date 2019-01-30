import createServerRender from '@frankmoney/webapp/es/server/render/createServerRender'
import createTheme from 'styles/createTheme'
import rootEpic from 'redux/rootEpic'
import rootReducer from 'redux/rootReducer'
import routes from '../routes'

const { frankTheme, muiTheme } = createTheme()

export default createServerRender({
  routes,
  frankTheme,
  muiTheme,
  reducer: rootReducer,
  epic: rootEpic,
  ssr: req => !req.user || (req.query && req.query.public === 'true'),
})
