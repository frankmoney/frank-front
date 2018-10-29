export default (...callbacks) => (...args) =>
  callbacks.forEach(cb => typeof cb === 'function' && cb(...args))
