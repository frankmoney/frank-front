import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'
import ACTIONS from '../actions'
import { paymentByIdSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(ACTIONS.check)
    .map(({ payload: { checked, id } }) =>
      (checked ? MULTI_ACTIONS.add : MULTI_ACTIONS.remove)(
        paymentByIdSelector(id)(store.getState())
      )
    )
