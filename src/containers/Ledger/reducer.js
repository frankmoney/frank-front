import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import { searchTyping } from './actions'
import DATA from './data.json'

export const REDUCER_KEY = 'ledger'

const mapTransaction = ({
  id,
  sum,
  frnk_description,
  frnk_title,
  categories,
  peerclient,
  description,
  title,
  ...otherProps
}) => ({
  id: id.toString(), // TODO stupid Table component hack
  createdAt: '2018-01-01 05:00',
  delta: parseFloat(sum),
  recipientName: peerclient.firstName,
  categoryAddedFromSimilar: true,
  categoryId: categories && categories[0] && categories[0].id,
  categoryName: categories && categories[0] && categories[0].name,
  description: frnk_description,
  title: frnk_title,
  ...otherProps,
})

export default handleActions(
  {
    [searchTyping]: (store, { payload: text }) => store.set('searchText', text),
  },
  Immutable.fromJS({
    searchText: '',
    transactions: DATA.transactions.map(mapTransaction),
  })
)
