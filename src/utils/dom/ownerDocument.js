// @flow strict

function ownerDocument(node: Node): Document {
  return (node && node.ownerDocument) || document
}

export default ownerDocument
