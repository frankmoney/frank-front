// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import SignUpForm from './SignUpForm'

type Props = {| className?: string |}

const SignUp = ({ className }: Props) => (
  <PageForm className={className} title="Sign Up">
    <SignUpForm />
  </PageForm>
)

export default SignUp
