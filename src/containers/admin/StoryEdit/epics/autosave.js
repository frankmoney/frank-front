import { change, blur } from 'redux-form/immutable'
import * as Rx from 'rxjs'
import ACTIONS from '../actions'
import { FORM_NAME, SAVE_MODE } from '../constants'
import {
  isLoadingSelector,
  processingSelector,
  publishedSelector,
  validSelector,
  dirtySelector,
} from '../selectors'

const changeType = change().type
const blurType = blur().type

export default (action$, store) =>
  Rx.Observable.merge(
    action$.ofType(changeType).debounceTime(5000),
    action$.ofType(blurType)
  )
    .debounceTime(2000)
    .filter(
      ({ meta: { form } }) =>
        form === FORM_NAME &&
        !isLoadingSelector(store.getState()) &&
        !processingSelector(store.getState()) &&
        !publishedSelector(store.getState()) &&
        dirtySelector(store.getState()) &&
        validSelector(store.getState())
    )
    .map(() =>
      ACTIONS.createOrUpdate({
        mode: SAVE_MODE.createOrUpdate,
        published: true,
      })
    )
