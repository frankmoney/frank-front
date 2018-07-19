import { createAction } from 'redux-actions'
import { createDeferredAction } from '@frankmoney/utils'

const createActionFactory = prefix => ({
  create(type) {
    return createAction(`${prefix}/${type}`)
  },
  createDeferred(type) {
    return createDeferredAction(`${prefix}/${type}`)
  },
})

export default createActionFactory
