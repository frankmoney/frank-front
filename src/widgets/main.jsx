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

type Props = {
  size: number,
}

const WidgetDemo = ({ size }: Props) => <InlineWidget size={size} />

const jss = createJSS()

const { frankTheme, muiTheme } = createTheme()

const widgetReducer = createReducer({
  [widgetDataKey]: widgetDataReducer,
})

const store = createStore(
  widgetReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const Application = ({ size }: Props) => (
  <JssProvider jss={jss}>
    <ThemeProvider frankTheme={frankTheme} muiTheme={muiTheme}>
      <StoreProvider store={store}>
        <GridSystemProvider>
          <WidgetDemo size={size} />
        </GridSystemProvider>
      </StoreProvider>
    </ThemeProvider>
  </JssProvider>
)

const el = document.getElementById('root')
if (el) {
  console.log('render main.jsx') // eslint-disable-line no-console
  const size = parseInt(el.getAttribute('data-frank-size'), 10) || 400
  console.log('size', size) // eslint-disable-line no-console
  ReactDOM.render(<Application size={size} />, el)
}
