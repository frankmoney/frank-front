import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const loadedSelector = get('loaded')

export const tokenSelector = get('token')
