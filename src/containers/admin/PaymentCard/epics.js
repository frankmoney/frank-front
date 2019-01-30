import {
  blur,
  focus,
  initialize,
  isDirty,
  getFormValues,
} from 'redux-form/immutable'
import * as Rx from 'rxjs'
import { currentAccountIdSelector } from 'redux/selectors/user'
import QUERIES from './queries'
import ACTIONS from './actions'
import { getFormName } from './const'
import * as SELECTORS from './selectors'

export const triggerSaveOnPublish = action$ =>
  action$
    .ofType(ACTIONS.publish)
    .map(({ payload: d }) => ACTIONS.save({ ...d, publish: true }))

export const triggerSaveOnUnpublish = action$ =>
  action$
    .ofType(ACTIONS.unpublish)
    .map(({ payload: d }) => ACTIONS.save({ ...d, publish: false }))

export const save = (action$, store, { graphql }) =>
  action$
    .ofType(ACTIONS.save)
    .switchMap(({ payload: { publish, id } }) => {
      const state = store.getState()
      const currentAccountId = currentAccountIdSelector(state)
      const { peerName, categoryId, description } = SELECTORS.paymentData(id)(
        state
      )

      return graphql(QUERIES.updatePayment, {
        accountId: currentAccountId,
        paymentIds: id,
        peerName,
        categoryId,
        description: description || '',
        verified: publish,
      }).then(({ payment, cascade }) => ({
        payment,
        cascade,
        published: publish === true,
        unpublished: publish === false,
      }))
    })
    .mergeMap(({ payment, cascade, published, unpublished }) => [
      ACTIONS.save.success({ payment, cascade }),
      ...(published ? [ACTIONS.publish.success(payment)] : []),
      ...(unpublished ? [ACTIONS.unpublish.success(payment)] : []),
    ])

const getPaymentIdFromForm = form => form.replace('payment-', '')

export const autosave = (action$, store) => {
  const blurType = blur().type
  const focusType = focus().type

  return Rx.Observable.merge(
    action$.ofType(focusType),
    action$.ofType(blurType)
  )
    .debounceTime(2000)
    .filter(({ type }) => type === blurType)
    .filter(({ meta: { form } }) => {
      const state = store.getState()
      const isPaymentForm = form.startsWith('payment-')
      const dirty = isDirty(form)(state)
      const canAutoSave = SELECTORS.canAutoSave(getPaymentIdFromForm(form))(
        state
      )
      const isNotSavingState = !SELECTORS.saving(form.replace('payment-', ''))(
        state
      )
      const isNotPublishingState = !SELECTORS.publishing(
        form.replace('payment-', '')
      )(state)

      return (
        isPaymentForm &&
        dirty &&
        canAutoSave &&
        isNotSavingState &&
        isNotPublishingState
      )
    })
    .map(({ meta: { form } }) =>
      ACTIONS.save({ id: getPaymentIdFromForm(form) })
    )
}

export const copy = (action$, store) =>
  action$.ofType(ACTIONS.copy).map(({ payload: form }) => {
    const state = store.getState()
    const { verified, ...formData } = getFormValues(form)(state).toJS()
    return ACTIONS.copy.success(formData)
  })

export const paste = (action$, store) =>
  action$.ofType(ACTIONS.paste).map(({ payload: paymentId }) => {
    const state = store.getState()
    const { verified, ...formData } = SELECTORS.paymentData(paymentId)(state)
    const clipboard = SELECTORS.clipboard(state)
    const data = {
      ...formData,
      ...clipboard,
      verified,
    }
    const formName = getFormName(paymentId)
    return initialize(formName, data, {
      // recommended default options
      keepSubmitSucceeded: true,
      updateUnregisteredFields: true,
    })
  })
