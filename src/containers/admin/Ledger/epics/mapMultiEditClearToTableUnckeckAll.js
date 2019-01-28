import { tableUncheckAllRows } from '@frankmoney/components'
import MULTI_ACTIONS from 'containers/admin/MultiEditSnack/actions'

export default action$ =>
  action$
    .filter(({ type }) =>
      [
        MULTI_ACTIONS.clear.toString(),
        MULTI_ACTIONS.updateSuccess.toString(),
        MULTI_ACTIONS.updateFail.toString(),
      ].includes(type)
    )
    .map(() => tableUncheckAllRows({ name: 'ledger' }))
