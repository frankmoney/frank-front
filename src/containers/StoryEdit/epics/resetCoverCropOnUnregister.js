import { change, unregisterField } from 'redux-form/immutable'
import { FORM_NAME } from '../constants'

export default action$ =>
  action$
    .ofType(unregisterField().type)
    .filter(
      ({ meta, payload }) =>
        meta.form === FORM_NAME && payload.name === 'coverCrop'
    )
    .mergeMap(({ meta: { form } }) => [change(form, 'coverCrop', null)])
