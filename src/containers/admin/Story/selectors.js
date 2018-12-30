// @flow strict
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { EditorState, ContentState, convertFromRaw } from 'draft-js'
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

export const storyEditorStateSelector = createSelector(storySelector, story => {
  if (!story) {
    return null
  }
  const { body } = story
  if (body.draftjs) {
    return EditorState.createWithContent(
      convertFromRaw(JSON.parse(body.draftjs))
    )
  }
  return EditorState.createWithContent(
    ContentState.createFromText(body.text || '')
  )
})
