/* eslint-disable no-console */
import React from 'react'
import ReactDOM from 'react-dom'

console.log('this is widget.js')

const ApplicationComponent = () => <h1>This is widget react content</h1>

console.log('render main.jsx')
const el = document.getElementById('root')
ReactDOM.render(<ApplicationComponent />, el)
