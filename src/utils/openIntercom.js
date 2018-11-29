const openIntercomChat = event => {
  if (typeof Intercom !== 'undefined') {
    // eslint-disable-next-line no-undef
    Intercom('showMessages')
  }

  if (event && event.preventDefault) {
    event.preventDefault()
  }
  return false
}

export default openIntercomChat
