const noop = function noop() {}

export default (...callbacks) => {
  if (callbacks.length === 0) {
    return noop
  }

  if (callbacks.length === 1) {
    return callbacks[0]
  }

  return (...args) =>
    callbacks.forEach(cb => typeof cb === 'function' && cb(...args))
}
