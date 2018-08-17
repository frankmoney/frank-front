import * as R from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import Pager from '../../components/Pager'
import * as ACTIONS from './actions'
import { currentPageSelector, totalPagesSelector } from './selectors'

const mapStateToProps = createStructuredSelector({
  current: currentPageSelector,
  total: totalPagesSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onPageSelect: ACTIONS.selectPage,
  },
])

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pager)
