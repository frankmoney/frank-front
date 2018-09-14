import { bindActionCreators } from 'redux'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

export default function reconnect(selectorsToProps, connectDispatch) {
  const mapStateToProps = selectorsToProps
    ? createStructuredSelector(selectorsToProps)
    : null
  const mapDispatchToProps = connectDispatch
    ? R.partial(bindActionCreators, [connectDispatch])
    : null

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )
}
