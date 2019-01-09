// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import {
  getFormValues,
  formValueSelector,
  isValid,
  isDirty,
} from 'redux-form/immutable'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { ContentState, convertFromRaw } from 'draft-js'
import type { ReduxState } from 'flow/redux'
import { REDUCER_KEY } from './reducer'
import { FORM_NAME } from './constants'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const savingSelector = get('saving')
export const deletingSelector = get('deleting')
export const processingSelector = createSelector(
  savingSelector,
  deletingSelector,
  (saving, deleting) => !!saving || deleting
)

export const storySelector = createPlainObjectSelector(get('story'))

export const publishedSelector = createSelector(
  storySelector,
  story => !!story.publishedAt
)

export const publishOrUnpublishConfirmDialogShownSelector = get(
  'publishOrUnpublishConfirmDialogShown'
)
export const deleteConfirmDialogShownSelector = get('deleteConfirmDialogShown')

export const canNotPublishSnackShownSelector = get('canNotPublishSnackShown')

const sortByPostedDateAsc = R.sort((a, b) => a.postedDate < b.postedDate)

export const formInitialValuesSelector = createSelector(
  storySelector,
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
export const formValuesSelector = getFormValues(FORM_NAME)

export const publishIssuesSelector = createSelector(
  formValuesSelector,
  formValues => {
    const errors = {}

    const { title, payments } = formValues.toJS()
    const description = formValues.get('description')

    if (!title || !title.trim()) {
      errors.title = 'Add title to publish'
    }

    if (!description || !description.hasText()) {
      errors.description = 'Add story text to publish'
    }

    if (!payments || !payments.length) {
      errors.payments = 'Attach payments to publish'
    }

    return Object.keys(errors).length ? errors : null
  }
)

export const storySelectedPaymentsSelector = createPlainObjectSelector(state =>
  storyEditFormValueSelector(state, 'payments')
)

export const storySelectedPaymentsIdsSelector = createSelector(
  storySelectedPaymentsSelector,
  R.map(R.prop('id'))
)
