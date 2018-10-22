import React from 'react'
import ReactDOM from 'react-dom'

console.log('this is widget.js')

const App = el => {
  console.log('widget app')
  ReactDOM.render(<h1>This is widget content</h1>, el)
}

window.Frank = {
  renderWidget: App,
}
