// @flow strict-local
import React from 'react'
import { createRouteUrl } from '@frankmoney/utils'
import PageForm from 'components/PageForm'
import { TextButton } from 'components/kit/Button'
import { ROUTES } from 'const'
import { injectStyles } from 'utils/styles'
import SignInForm from './SignInForm'

const styles = {
  signUp: {
    position: 'absolute',
    top: 40,
    right: 40,
  },
}

const SignIn = ({ classes }) => (
  <PageForm title="Sign In" centered>
    <div className={classes.signUp}>
      <TextButton
        color="solidGray"
        larger
        label="Sign Up"
        href={createRouteUrl(ROUTES.auth.register)}
      />
    </div>
    <SignInForm />
  </PageForm>
)

export default injectStyles(styles)(SignIn)
