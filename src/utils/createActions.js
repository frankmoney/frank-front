import * as R from 'ramda'
import createActionFactory from './createActionFactory'

const createActions = (prefix, descriptors) => {
  const factory = createActionFactory(prefix)
  return R.pipe(
    Object.keys,
    R.map(type => [
      type,
      descriptors[type] ? factory.createDeferred(type) : factory.create(type),
    ]),
    R.fromPairs
  )(descriptors)
}

export default createActions
