// @flow strict-local
import { createPlainObjectSelector } from '@frankmoney/utils'
import { ContentState, convertFromRaw, EditorState } from 'draft-js'
import { createSelector } from 'reselect'
import * as R from 'ramda'
import { type ReduxState, type Selector } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const getter = (...path) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...path])

const getters = {
  story: getter('story'),
  isLoaded: getter('isLoaded'),
  account: getter('account'),
  accountId: getter('account', 'id'),
}

export const isLoadedSelector = getters.isLoaded
export const isLoadFailedSelector = getter('isLoadFailed')
export const isNotFoundSelector = getter('isNotFound')

export const accountSelector = createPlainObjectSelector(getters.account)

export const storySelector = createSelector(
  createPlainObjectSelector(getters.story),
  getters.accountId,
  (story, accountId) =>
    story &&
    R.evolve({ payments: R.map(R.assoc('accountId', accountId)) }, story)
)

export const storyEditorStateSelector: Selector<EditorState> = createSelector(
  storySelector,
  story => {
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
  }
)
