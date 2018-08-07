import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import { searchTyping } from './actions'
import DATA from './demo.json'

export const REDUCER_KEY = 'directory'

export default handleActions(
  {
    [searchTyping]: (store, { payload: text }) => store.set('searchText', text),
  },
  Immutable.fromJS({
    searchText: '',
    recipients: DATA.recipients,
  })
)
