import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_NAME } from './constants'

const getter = (...path) => s => s.getIn([REDUCER_NAME, ...path])

const getters = {
  loaded: getter('loaded'),
  loading: getter('loading'),
  accessItems: getter('accessItems'),
}

export const loadedSelector = getters.loaded
export const loadingSelector = getters.loading

export const accessItemsSelector = createPlainObjectSelector(
  getters.accessItems
)
