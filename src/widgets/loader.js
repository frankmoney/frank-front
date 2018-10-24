// @flow
/* eslint-disable no-console */

const widgetHtml = size => `
    <div id="root" data-frank-size="${size}">[react root]</div>
    <script src="/widget.js"></script>
`

console.log('this is iframe loader')

const insertIframe = (el: Element, width: number, height: number) => {
  console.log('replacing with iframe')
  const iframe = document.createElement('iframe')
  iframe.style.border = '1px solid red' // FIXME: remove debug border
  iframe.width = `${width}`
  iframe.height = `${height}`
  iframe.sandbox.add('allow-scripts')
  // $FlowFixMe: flow reports `srcdoc` as missing
  iframe.srcdoc = widgetHtml(width)
  el.replaceWith(iframe)
}

const widgetSizes = {
  '400': [400, 275],
  '500': [500, 345],
}

const placeholders = document.querySelectorAll('[data-frank-widget]')
placeholders.forEach(el => {
  console.log('processing widget placeholder')
  const size = el.getAttribute('data-frank-size') || '400'
  const [width, height] = widgetSizes[size]
  insertIframe(el, width, height)
})
