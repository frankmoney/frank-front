import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import { mapPayment } from 'data/models/payment'
import { searchTyping } from './actions'
import DATA from './data.json'

export const REDUCER_KEY = 'recipient'

export default handleActions(
  {
    [searchTyping]: (store, { payload: text }) => store.set('searchText', text),
  },
  Immutable.fromJS({
    searchText: '',
    transactions: DATA.transactions.map(mapPayment),
  })
)
