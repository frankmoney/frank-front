import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const sentToSelector = get('sentTo')
