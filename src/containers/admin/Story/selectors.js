// @flow strict
import { createPlainObjectSelector } from '@frankmoney/utils'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const getter = (...path) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...path])

const getters = {
  story: getter('story'),
  isLoaded: getter('isLoaded'),
}

export const isLoadedSelector = getters.isLoaded

export const storySelector = createPlainObjectSelector(getters.story)
