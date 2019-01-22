// @flow strict
import * as R from 'ramda'
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
  accountId: getter('account', 'id'),
}

export const isLoadedSelector = getters.isLoaded

export const storySelector = createSelector(
  createPlainObjectSelector(getters.story),
  getters.accountId,
  (story, accountId) =>
    story &&
    R.evolve({ payments: R.map(R.assoc('accountId', accountId)) }, story)
)

export const storyEditorStateSelector = createSelector(storySelector, story => {
  if (!story) {
    return null
  }
  const { body } = story
  if (body && body.draftjs) {
    return EditorState.createWithContent(
      convertFromRaw(JSON.parse(body.draftjs))
    )
  }
  return EditorState.createWithContent(
    ContentState.createFromText((body && body.text) || '')
  )
})
