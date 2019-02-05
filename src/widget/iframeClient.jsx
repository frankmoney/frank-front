import qs from 'querystring'
import React from 'react'
import ReactDOM from 'react-dom'
import InlineWidget from 'components/widgets/InlineWidget'
import Normalize from 'styles/Normalize'
import App from './app'

const parseQueryString = url => {
  const data = qs.parse(url)

  for (const k in data) {
    if (data[k] === 'false') {
      data[k] = false
    } else if (data[k] === 'true') {
      data[k] = true
    }
  }

  return data
}

const getInitialSettings = () => {
  const script = document.currentScript
  const QS_RE = /\?(\S+)$/

  let scriptQueryMatch = script && script.src.match(QS_RE)
  scriptQueryMatch = scriptQueryMatch && scriptQueryMatch[1]
  return scriptQueryMatch && parseQueryString(scriptQueryMatch)
}

const options = getInitialSettings()
const width = options.width || window.innerWidth

ReactDOM.render(
  <App>
    <>
      <Normalize />
      <InlineWidget {...options} width={width} />
    </>
  </App>,
  document.body
)
