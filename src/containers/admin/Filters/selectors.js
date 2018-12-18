// @flow strict
import { createPlainObjectSelector } from '@frankmoney/utils'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const data = createPlainObjectSelector(get('data'))
export const estimating = get('estimatingResults')
export const loaded = get('loaded')
export const open = get('open')
export const totalCount = get('totalCount')
