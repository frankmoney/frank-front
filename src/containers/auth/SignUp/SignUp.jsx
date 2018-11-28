// @flow
import React from 'react'
import PageForm from 'components/PageForm'
import SignUpForm from './SignUpForm'

const SignUp = ({ className }) => (
  <PageForm className={className} title="Sign Up">
    <SignUpForm />
  </PageForm>
)

export default SignUp
