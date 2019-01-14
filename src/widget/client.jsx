import qs from 'querystring'
import React from 'react'
import ReactDOM from 'react-dom'
import defaults from 'lodash/defaults'
import assign from 'lodash/assign'
import MobileDetect from 'mobile-detect'
import Widget from './app'

const CONTAINER_ID = 'frank-embed-container'
if (!window.Frank) {
  window.Frank = {}
}

const Frank = window.Frank

if (!Frank.settings) {
  Frank.settings = {}
}

const defaultSettings = {
  show: 'account-overview',
  position: 'right',
  autoloadButton: true,
  openImmediately: false,
  mobile: !!new MobileDetect(navigator.userAgent).phone(),
}

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

const load = () => {
  const clientSettings = assign({}, Frank.settings)
  const scripts = document.getElementsByTagName('script')
  const SCRIPT_RE = new RegExp(__SCRIPT_BASE_URL, 'i')
  const QS_RE = /\?(\S+)$/

  let found

  const foundScripts = Array.prototype.slice.call(scripts).filter(script => {
    const scriptSrc = script.src

    if (!scriptSrc || !scriptSrc.match(SCRIPT_RE)) {
      return
    }

    return true
  })

  if (foundScripts.length > 1) {
    console.warn(
      'There are more than one Frank widget script found, we will use the last one'
    )
  }

  const script = foundScripts.slice(-1)[0]
  let scriptQueryMatch = script && script.src.match(QS_RE)
  scriptQueryMatch = scriptQueryMatch && scriptQueryMatch[1]

  const scriptTagSettings =
    scriptQueryMatch && parseQueryString(scriptQueryMatch)

  if (!document.getElementById('frank-embed-container')) {
    const container = document.createElement('div')
    container.id = 'frank-embed-container'
    document.body.appendChild(container)
  }

  if (Frank.widget) {
    // console.warn('Frank widget was previously loaded');
  }

  if (typeof clientSettings.onLoad === 'function') {
    Frank.settings.onLoad()
  }

  const summarySettings = defaults(
    {},
    clientSettings,
    scriptTagSettings,
    defaultSettings
  )
  // const logger = Frank.logger = new Logger({logLevel: summarySettings.debug ? 'info' : 'warn'});

  try {
    const widgetOptions = assign({}, summarySettings, { logger: null })

    let container = document.getElementById(
      widgetOptions.containerId || CONTAINER_ID
    )
    if (!container) {
      container = document.createElement('div')
      container.id = CONTAINER_ID
      document.body.appendChild(container)
    }

    console.log(container)
    Frank.widget = ReactDOM.render(
      React.createElement(Widget, widgetOptions),
      container
    )
  } catch (err) {
    console.error(err)
    // logger.error('Frank widget init failed: ', err); // gracefully handle errors
  }
}

load()
