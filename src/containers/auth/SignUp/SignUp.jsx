// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import Footer from './Footer'
import SignUpForm from './SignUpForm'

type Props = {| className?: string |}

const SignUp = ({ className }: Props) => (
  <PageForm className={className} title="Sign Up">
    <SignUpForm />
    <Footer />
  </PageForm>
)

export default SignUp
