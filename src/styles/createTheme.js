import { createFrankTheme, createMuiTheme } from '@frankmoney/components-csr'
import overrides from './frank-theme.jss'

export default () => {
  const frank = createFrankTheme(overrides)

  return {
    frankTheme: frank,
    muiTheme: createMuiTheme(frank),
  }
}
