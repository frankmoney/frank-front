import * as R from 'ramda'
import { createSelector } from 'reselect'
import { formValueSelector, isValid, isDirty } from 'redux-form/immutable'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'
import { FORM_NAME } from './constants'

const get = (...prop) => store => store.getIn([REDUCER_KEY, ...prop])

export const isLoadingSelector = get('loading')
export const loadedSelector = get('loaded')

export const isSavingSelector = get('saving')
export const savedSelector = get('saved')

export const isProcessingSelector = get('processing')

export const storySelector = createPlainObjectSelector(get('story'))

export const isNewStorySelector = createSelector(storySelector, R.isNil)

export const isPublishedSelector = createSelector(
  storySelector,
  R.ifElse(R.isNil, R.always(false), R.prop('isPublished'))
)

export const hasUnpublishedDraftSelector = createSelector(
  storySelector,
  R.ifElse(R.isNil, R.always(false), R.prop('hasUnpublishedDraft'))
)

export const formInitialValuesSelector = createSelector(
  storySelector,
  R.ifElse(
    R.complement(R.isNil),
    story => {
      const values = R.pick(['coverImage', 'title', 'body', 'payments'])(story)

      if (!values.coverImage) {
        values.coverImage = []
      } else {
        values.coverCrop =
          values.coverImage.crop && values.coverImage.crop.sized
        values.coverImage = [values.coverImage]
      }

      if (!values.body) {
        values.description = ''
      } else {
        values.description = values.body.text
      }

      if (!values.payments) {
        values.payments = []
      }

      return values
    },
    () => ({
      payments: [],
      coverImage: [],
    })
  )
)

const storyEditFormValueSelector = formValueSelector(FORM_NAME)

export const unsavedFormSelector = isDirty(FORM_NAME)

export const isSaveButtonDisabledSelector = createSelector(
  isValid(FORM_NAME),
  isDirty(FORM_NAME),
  (valid, dirty) => !dirty || !(valid && dirty)
)

export const saveButtonLabelSelector = createSelector(
  isDirty(FORM_NAME),
  savedSelector,
  (dirty, saved) => (saved && !dirty ? 'Saved' : 'Save')
)

export const isPublishButtonDisabledSelector = createSelector(
  savedSelector,
  isPublishedSelector,
  hasUnpublishedDraftSelector,
  (saved, isPublished, hasUnpublishedDraft) =>
    !saved || (!hasUnpublishedDraft && isPublished)
)

export const publishButtonLabelSelector = createSelector(
  isValid(FORM_NAME),
  isDirty(FORM_NAME),
  savedSelector,
  isPublishedSelector,
  hasUnpublishedDraftSelector,
  (valid, dirty, saved, isPublished, hasUnpublishedDraft) => {
    if (isPublished) {
      return hasUnpublishedDraft || (!saved && valid && dirty)
        ? 'Republish'
        : 'Published'
    }
    return 'Publish'
  }
)

export const isDeleteButtonDisabledSelector = createSelector(
  isNewStorySelector,
  isNew => isNew
)

export const storySelectedPaymentsSelector = createPlainObjectSelector(state =>
  storyEditFormValueSelector(state, 'payments')
)

export const paymentsFilterDateMinSelector = get('paymentsFilterDateMin')

export const paymentsFilterDateMaxSelector = get('paymentsFilterDateMax')

export const paymentsFiltersSelector = createSelector(
  paymentsFilterDateMinSelector,
  paymentsFilterDateMaxSelector,
  (dateMin, dateMax) => ({
    dateMin: dateMin || null,
    dateMax: dateMax || null,
  })
)

export const paymentsLoadedPagesCounterSelector = get(
  'paymentsLoadedPagesCount'
)

export const paymentsTotalPagesCounterSelector = get('paymentsTotalPagesCount')

export const paymentsListUpdatingSelector = get('paymentsListLoading')

export const paymentsSelector = createPlainObjectSelector(get('payments'))
