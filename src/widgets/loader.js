console.log('this is loader')

const createScript = callback => {
  const scriptPath = '/widget.js'
  const script = document.createElement('script')
  script.onload = callback
  script.src = scriptPath
  document.getElementsByTagName('head')[0].appendChild(script)
}

const renderWidget = el => () => {
  console.log('rendering the widget')
  if (window.Frank) {
    window.Frank.renderWidget(el)
  }
}

const el = document.querySelector('#frank-widget')
if (el) {
  console.log('adding the script')
  createScript(renderWidget(el))
}
