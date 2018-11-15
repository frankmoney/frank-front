// @flow strict
import * as React from 'react'
import { createPortal } from 'react-dom'
import getBody from './getBody'

const createPortalInBody = (node: React.Node): React.Portal =>
  createPortal(node, getBody())

export default createPortalInBody
