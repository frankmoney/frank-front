import { tableCheckRow } from '@frankmoney/components'
import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'
import { rowDataSelector } from '../selectors'

export default (action$, store) =>
  action$
    .ofType(tableCheckRow)
    .filter(({ payload: { name } }) => name === 'ledger')
    .map(({ payload: { isChecked, rowId } }) =>
      (isChecked ? MULTI_ACTIONS.add : MULTI_ACTIONS.remove)(
        rowDataSelector(rowId)(store.getState())
      )
    )
