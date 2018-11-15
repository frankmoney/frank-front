// @flow strict
import * as React from 'react'
import { findDOMNode as findDOMNodeOriginal } from 'react-dom'

// flowlint-next-line unclear-type:off
type Instance = Element | React.Component<any>

export default (instance: Instance): Element => {
  // flowlint-next-line unclear-type:off
  const el = (findDOMNodeOriginal(instance): any)
  return el
}
