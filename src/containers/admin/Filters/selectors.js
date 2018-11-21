import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const data = createPlainObjectSelector(get('data'))
export const estimating = get('estimatingResults')
export const loaded = get('loaded')
export const open = get('open')
export const totalCount = get('totalCount')
