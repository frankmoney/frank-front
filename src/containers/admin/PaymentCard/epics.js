import { change, blur, isDirty } from 'redux-form/immutable'
import * as Rx from 'rxjs'
import { currentAccountIdSelector } from 'redux/selectors/user'
import QUERIES from './queries'
import ACTIONS from './actions'
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
        paymentId: id,
        peerName,
        categoryId,
        description,
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

export const autosave = (action$, store) => {
  const changeType = change().type
  const blurType = blur().type

  return Rx.Observable.merge(
    action$.ofType(changeType).debounceTime(5000),
    action$.ofType(blurType)
  )
    .debounceTime(2000)
    .filter(
      ({ meta: { form } }) =>
        form.startsWith('payment-') &&
        isDirty(form)(store.getState()) &&
        !SELECTORS.saving(form.replace('payment-', ''))(store.getState()) &&
        !SELECTORS.publishing(form.replace('payment-', ''))(store.getState())
    )
    .map(({ meta: { form } }) =>
      ACTIONS.save({ id: form.replace('payment-', '') })
    )
}
