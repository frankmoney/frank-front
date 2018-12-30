// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import type { ReduxState } from 'flow/redux'
import { mapToPlainTextBody } from 'data/models/stories'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const storiesSelector = createSelector(
  createPlainObjectSelector(get('stories')),
  R.map(({ body, ...other }) => ({
    ...other,
    text: mapToPlainTextBody(body),
  }))
)

export const hasNoStoriesSelector = createSelector(storiesSelector, R.isEmpty)

export const isShareDialogOpenSelector = get('shareDialogIsOpen')
export const shareDialogUrlSelector = get('shareDialogUrl')
