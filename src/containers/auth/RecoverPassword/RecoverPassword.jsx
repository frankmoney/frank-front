// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import RecoverPasswordForm from './RecoverPasswordForm'

const RecoverPassword = ({ className }) => (
  <PageForm className={className} title="Reset Password" centered>
    <RecoverPasswordForm />
  </PageForm>
)

export default RecoverPassword
