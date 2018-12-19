import { REDUCER_KEY } from './reducer'

const getter = (...path) => s => s.getIn([REDUCER_KEY, ...path])

const getters = {
  busy: getter('busy'),
}

export const busySelector = getters.busy
