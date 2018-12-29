// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { formValueSelector, isValid, isDirty } from 'redux-form/immutable'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { EditorState, ContentState, convertFromRaw } from 'draft-js'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'
import { FORM_NAME } from './constants'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const isSavingSelector = get('saving')
export const savedSelector = get('saved')

export const isProcessingSelector = get('processing')

export const storySelector = createPlainObjectSelector(get('story'))

export const draftSelector = createSelector(storySelector, R.prop('draft'))

export const isDirtySelector = isDirty(FORM_NAME)

export const isNewStorySelector = createSelector(
  storySelector,
  R.pipe(
    R.prop('id'),
    R.isNil
  )
)

export const isPublishedSelector = createSelector(
  storySelector,
  R.ifElse(R.isNil, R.always(false), R.prop('publishedAt'))
)

export const isDraftPublishedSelector = createSelector(
  draftSelector,
  R.prop('published')
)

export const hasUnpublishedDraftSelector = createSelector(
  draftSelector,
  R.pipe(
    R.prop('published'),
    R.not
  )
)

const sortByPostedDateAsc = R.sort((a, b) => a.postedDate < b.postedDate)

export const formInitialValuesSelector = createSelector(
  draftSelector,
  R.pipe(
    R.ifElse(
      R.complement(R.isNil),
      draft => {
        const values = R.pick(['cover', 'title', 'body', 'payments'])(draft)

        if (!values.cover) {
          values.cover = []
        } else {
          values.coverCrop = values.cover.crop && values.cover.crop.sized
          values.cover = [values.cover]
        }

        if (values.body && values.body.draftjs) {
          values.description = convertFromRaw(JSON.parse(values.body.draftjs))
        } else {
          values.description = ContentState.createFromText(values.body.text)
        }

        if (!values.payments) {
          values.payments = []
        }

        return values
      },
      () => ({
        payments: [],
        cover: [],
      })
    ),
    R.evolve({ payments: sortByPostedDateAsc })
  )
)

const storyEditFormValueSelector = formValueSelector(FORM_NAME)

export const validSelector = (state: ReduxState) => isValid(FORM_NAME)(state)

export const dirtySelector = (state: ReduxState) => isDirty(FORM_NAME)(state)

export const isSaveButtonDisabledSelector = createSelector(
  dirtySelector,
  isProcessingSelector,
  (dirty, processing) => processing || !dirty
)

export const saveButtonLabelSelector = createSelector(
  dirtySelector,
  savedSelector,
  (dirty, saved) => (saved && !dirty ? 'Saved' : 'Save')
)

export const updateButtonLabelSelector = createSelector(
  dirtySelector,
  savedSelector,
  (dirty, saved) => (saved && !dirty ? 'Updated' : 'Update')
)

export const isPublishButtonDisabledSelector = createSelector(
  validSelector,
  dirtySelector,
  isSavingSelector,
  isProcessingSelector,
  isDraftPublishedSelector,
  (valid, dirty, saving, processing, published) => {
    if (saving || processing) {
      return true
    }
    if (published) {
      return false
    }
    return !valid
  }
)

export const publishButtonLabelSelector = createSelector(
  validSelector,
  dirtySelector,
  isPublishedSelector,
  (valid, dirty, storyPublished) => (storyPublished ? 'Unpublish' : 'Publish')
)

export const isDeleteButtonDisabledSelector = createSelector(
  isNewStorySelector,
  isNew => isNew
)

export const storySelectedPaymentsSelector = createPlainObjectSelector(state =>
  storyEditFormValueSelector(state, 'payments')
)

export const storySelectedPaymentsIdsSelector = createSelector(
  storySelectedPaymentsSelector,
  R.map(R.prop('id'))
)
