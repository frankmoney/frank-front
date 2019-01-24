import { bindActionCreators } from 'redux'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

export default function reconnect(
  selectorsToProps,
  connectDispatch,
  ...connectArgs
) {
  const mapStateToProps = selectorsToProps
    ? typeof selectorsToProps === 'function'
      ? (...args) => createStructuredSelector(selectorsToProps(...args))
      : createStructuredSelector(selectorsToProps)
    : null

  const mapDispatchToProps = connectDispatch
    ? typeof connectDispatch === 'function'
      ? (dispatch, ownProps) =>
          bindActionCreators(connectDispatch(ownProps), dispatch)
      : R.partial(bindActionCreators, [connectDispatch])
    : null

  return connect(
    mapStateToProps,
    mapDispatchToProps,
    ...connectArgs
  )
}
