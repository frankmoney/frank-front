// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import reconnect from 'utils/reconnect'
import SignInForm from './SignInForm'
import ACTIONS from './actions'

type Props = {|
  className?: string,
  load: () => void,
  leave: () => void,
|}

class SignIn extends React.Component<Props> {
  componentWillMount() {
    this.props.load()
  }

  componentWillUnmount() {
    this.props.leave()
  }

  render(): React.ReactNode {
    const { className } = this.props

    return (
      <PageForm className={className} title="Sign In" centered>
        <SignInForm />
      </PageForm>
    )
  }
}

export default reconnect(null, { load: ACTIONS.load, leave: ACTIONS.leave })(
  SignIn
)
