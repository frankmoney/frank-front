import createFrankTheme from './createFrankTheme'
import createMuiTheme from './createMuiTheme'

export default () => {
  const frank = createFrankTheme()

  return {
    frankTheme: frank,
    muiTheme: createMuiTheme(frank),
  }
}
