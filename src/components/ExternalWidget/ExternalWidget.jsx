import qs from 'querystring'
import React from 'react'

const SCRIPT_ID = 'frank-widget-script'

const addScriptTag = src => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  script.setAttribute('id', SCRIPT_ID)
  document.body.appendChild(script)
}

const cleanScript = () => {
  if (document.getElementById(SCRIPT_ID)) {
    document.getElementById(SCRIPT_ID).remove()
  }
}

const deinitWidgetApp = () => {
  if (typeof window !== 'undefined' && typeof window.Frank !== 'undefined') {
    window.Frank.clean()
  }
}

class ExternalWidget extends React.Component {
  static defaultProps = {
    // scriptSrc: 'https://assets2.frank.ly/widget/main.js',
    scriptSrc: 'http://0.0.0.0:8082/assets/main.js',
    widgetOptions: {
      position: 'right',
    },
  }

  componentDidMount() {
    addScriptTag(
      `${this.props.scriptSrc}?${qs.stringify(this.props.widgetOptions)}`
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.widgetOptions !== nextProps.widgetOptions) {
      window.Frank.changeOptions(nextProps.widgetOptions)
    }
  }

  componentWillUnmount() {
    cleanScript()
    deinitWidgetApp()
  }

  render() {
    return null
  }
}

export default ExternalWidget
