// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import SignInForm from './SignInForm'

type Props = {| className?: string |}

const SignIn = ({ className }: Props) => (
  <PageForm className={className} title="Sign In" centered>
    <SignInForm />
  </PageForm>
)

export default SignIn
