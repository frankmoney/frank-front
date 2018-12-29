// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { convertFromRaw } from 'draft-js'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')

const mapBody = body => {
  if (!body) {
    return null
  }

  if (body.draftjs) {
    return convertFromRaw(JSON.parse(body.draftjs))
      .getPlainText()
      .trim()
  }

  return body.text.trim()
}

export const storiesSelector = createSelector(
  createPlainObjectSelector(get('stories')),
  R.map(({ draft: { body, ...draft }, ...story }) => ({
    draft: { text: mapBody(body), ...draft },
    ...story,
  }))
)

export const hasNoStoriesSelector = createSelector(storiesSelector, R.isEmpty)

export const isShareDialogOpenSelector = get('shareDialogIsOpen')
export const shareDialogUrlSelector = get('shareDialogUrl')
