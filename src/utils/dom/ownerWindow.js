// @flow strict
import ownerDocument from './ownerDocument'

function ownerWindow(node: Node, fallback: WindowProxy = window): WindowProxy {
  const doc = ownerDocument(node)
  return doc.defaultView || doc.parentView || fallback // FIXME: document.parentView does not exist
}

export default ownerWindow
