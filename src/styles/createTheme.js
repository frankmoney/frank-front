import * as R from 'ramda'
import { createFrankTheme, createMuiTheme } from '@frankmoney/components-csr'
import frankTheme from './frank-theme.jss'
import colors from './colors'

export default () => {
  const overrides = R.mergeDeepLeft({ colors }, frankTheme)
  const frank = createFrankTheme(overrides)

  return {
    frankTheme: frank,
    muiTheme: createMuiTheme(frank),
  }
}
