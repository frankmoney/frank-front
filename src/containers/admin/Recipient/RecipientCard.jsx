import * as R from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RecipientCard from 'components/RecipientCard'
import * as ACTIONS from './actions'

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onEditName: ACTIONS.editName,
  },
])

export default connect(
  null,
  mapDispatchToProps
)(RecipientCard)
