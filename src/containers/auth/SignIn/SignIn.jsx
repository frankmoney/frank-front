// @flow
import React from 'react'
import PageForm from 'components/PageForm'
import SignInForm from './SignInForm'

const SignIn = ({ className }) => (
  <PageForm className={className} title="Sign In" centered>
    <SignInForm />
  </PageForm>
)

export default SignIn
