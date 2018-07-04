import { createFrankTheme, createMuiTheme } from '@frankmoney/components-csr'

export default () => {
  const frank = createFrankTheme()

  return {
    frankTheme: frank,
    muiTheme: createMuiTheme(frank),
  }
}
