// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider as StoreProvider } from 'react-redux'
import { JssProvider } from 'react-jss'
import { GridSystemProvider } from '@frankmoney/grid'
import ThemeProvider from '@frankmoney/webapp/es/app/components/ThemeProvider'
import createJSS from '@frankmoney/webapp/es/app/createJss'
import { createReducer } from '@frankmoney/webapp'
import InlineWidget from 'containers/Widget/InlineWidget'
import widgetDataReducer, {
  REDUCER_KEY as widgetDataKey,
} from 'containers/Widget/reducer'
import createTheme from 'styles/createTheme'
import 'minireset.css'

const WidgetDemo = () => <InlineWidget size={400} />

const jss = createJSS()

const { frankTheme, muiTheme } = createTheme()

const widgetReducer = createReducer({
  [widgetDataKey]: widgetDataReducer,
})

const store = createStore(
  widgetReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const Application = () => (
  <JssProvider jss={jss}>
    <ThemeProvider frankTheme={frankTheme} muiTheme={muiTheme}>
      <StoreProvider store={store}>
        <GridSystemProvider>
          <WidgetDemo />
        </GridSystemProvider>
      </StoreProvider>
    </ThemeProvider>
  </JssProvider>
)

const el = document.getElementById('root')
if (el) {
  console.log('render main.jsx') // eslint-disable-line no-console
  ReactDOM.render(<Application />, el)
}
