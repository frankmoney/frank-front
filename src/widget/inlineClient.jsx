document
  .querySelectorAll('.frank-embed:not(.frank-embed-rendered)')
  .forEach(el => {
    const { accountId, width, height } = el.dataset

    const iframe = document.createElement('iframe')
    iframe.frameBorder = 0
    iframe.scrolling = 'no'
    iframe.width = `${width}px`
    iframe.height = `${height}px`
    el.appendChild(iframe)
    const frameDoc = iframe.contentWindow.document

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://0.0.0.0:8082/assets/iframe.js?accountId=${accountId}&width=${width}&height=${height}`
    frameDoc.body.appendChild(script)
    el.classList.add('frank-embed-rendered')
  })
