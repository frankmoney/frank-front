// @flow
import React from 'react'
import { compose, branch, renderComponent, lifecycle } from 'recompose'
import AreaSpinner from 'components/AreaSpinner'
import reconnect from 'utils/reconnect'
import * as ACTIONS from './actions'
import * as SELECTORS from './selectors'
import * as STEPS from './Steps'

const SourceReconnect = ({
  isError,
  isCredentials,
  isMfa,
  isSuccess,
  loading,
  loaded,
  load,
  leave,
  ...props
}) => {
  let Component = null
  if (isError) {
    Component = STEPS.AccountLocked
  } else if (isCredentials) {
    Component = STEPS.Credentials
  } else if (isMfa) {
    Component = STEPS.MFA
  } else if (isSuccess) {
    Component = STEPS.AccountLinked
  }

  if (Component) {
    return <Component {...props} />
  }

  // TODO not possible?
  return null
}

export default compose(
  reconnect(
    {
      loading: SELECTORS.loading,
      loaded: SELECTORS.loaded,
      isError: SELECTORS.isError,
      isMfa: SELECTORS.isMFA,
      isSuccess: SELECTORS.isSuccess,
      isCredentials: SELECTORS.isCredentials,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        const { sourceId, accountId } = this.props

        this.props.load({
          accountId,
          sourceId,
        })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => !props.loaded, renderComponent(AreaSpinner))
)(SourceReconnect)
