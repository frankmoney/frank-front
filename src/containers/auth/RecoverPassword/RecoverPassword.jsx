// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import reconnect from 'utils/reconnect'
import RecoverPasswordForm from './RecoverPasswordForm'
import RecoverPasswordSuccess from './RecoverPasswordSuccess'
import { sentToSelector } from './selectors'

const RecoverPassword = ({ className, sentTo }) =>
  sentTo ? (
    <RecoverPasswordSuccess sentTo={sentTo} />
  ) : (
    <PageForm className={className} title="Reset Password" centered>
      <RecoverPasswordForm />
    </PageForm>
  )

export default reconnect({ sentTo: sentToSelector })(RecoverPassword)
