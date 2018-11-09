// @flow
import * as R from 'ramda'
import createActionFactory, { type ActionFunction } from './createActionFactory'

type Descriptors = { [string]: boolean }
type Actions = { [string]: ActionFunction }

const createActions = (prefix: string, descriptors: Descriptors): Actions => {
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
