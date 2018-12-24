// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import reconnect from 'utils/reconnect'
import ResetPasswordForm from './ResetPasswordForm'
import ACTIONS from './actions'

type Props = {|
  match?: *,
  className?: string,
  load: () => void,
  leave: () => void,
|}

class ResetPassword extends React.Component<Props> {
  componentWillMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props
    this.props.load({ token })
  }

  componentWillUnmount() {
    this.props.leave()
  }

  render() {
    const { className } = this.props

    return (
      <PageForm className={className} title="Reset Password" centered>
        <ResetPasswordForm />
      </PageForm>
    )
  }
}

export default reconnect(null, {
  load: ACTIONS.load,
  leave: ACTIONS.leave,
})(ResetPassword)
