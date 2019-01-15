// @flow strict-local
import React from 'react'
import AreaSpinner from 'components/AreaSpinner'
import PageForm from 'components/PageForm'
import reconnect from 'utils/reconnect'
import CreateUserForm from './CreateUserForm'
import ACTIONS from './actions'
import { loadedSelector } from './selectors'

type Props = {|
  match?: {
    params: {
      token: string,
    },
  },
  className?: string,
  loaded: boolean,
  load: () => void,
  leave: () => void,
|}

class AcceptInvitation extends React.Component<Props> {
  componentWillMount() {
    if (this.props.match) {
      this.props.load({ token: this.props.match.params.token })
    }
  }

  componentWillUnmount() {
    this.props.leave()
  }

  render() {
    const { className, loaded } = this.props

    return loaded ? (
      <PageForm className={className} title="Sign Up" centered>
        <CreateUserForm />
      </PageForm>
    ) : (
      <AreaSpinner />
    )
  }
}

export default reconnect(
  {
    loaded: loadedSelector,
  },
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
  }
)(AcceptInvitation)
