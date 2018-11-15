import { connect } from 'react-redux'
import SearchCard from 'components/SearchCard'
import * as ACTIONS from './actions'
import { searchTextSelector } from './selectors'

const LedgerSearch = connect(
  state => ({
    value: searchTextSelector(state),
  }),
  dispatch => ({
    onChange: event => {
      dispatch(ACTIONS.searchTyping(event.currentTarget.value))
    },
  })
)(SearchCard)

export default LedgerSearch
