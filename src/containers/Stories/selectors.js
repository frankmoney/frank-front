import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const storiesSelector = createPlainObjectSelector(get('stories'))

export const hasNoStoriesSelector = createSelector(storiesSelector, R.isEmpty)

export const isShareDialogOpenSelector = get('shareDialogIsOpen')
export const shareDialogUrlSelector = get('shareDialogUrl')
