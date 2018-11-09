// @flow
import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

export type ActionFunction = Function

export type ActionFactory = {|
  create: string => ActionFunction,
  createDeferred: string => ActionFunction,
|}

const createActionFactory: string => ActionFactory = prefix => ({
  create(type: string) {
    return createAction(`${prefix}/${type}`)
  },
  createDeferred(type: string) {
    return createDeferredAction(`${prefix}/${type}`)
  },
})

export default createActionFactory
