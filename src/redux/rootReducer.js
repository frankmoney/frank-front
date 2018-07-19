import { createReducer } from '@frankmoney/webapp'
import ledgerReducer, { REDUCER_KEY as LEDGER } from 'containers/Ledger/reducer'

export default createReducer({ [LEDGER]: ledgerReducer })
