// @flow
import * as React from 'react'
import { createPortal } from 'react-dom'

type GetBodyFn = () => HTMLBodyElement
type CreatePortalFn = React.Node => React.Portal

const getBody: GetBodyFn = () => (document.body: any)

const createPortalInBody: CreatePortalFn = node => createPortal(node, getBody())

export default createPortalInBody
