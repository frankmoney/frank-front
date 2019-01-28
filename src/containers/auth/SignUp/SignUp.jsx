// @flow strict-local
import React from 'react'
import { createRouteUrl } from '@frankmoney/utils'
import PageForm from 'components/PageForm'
import { TextButton } from 'components/kit/Button'
import { ROUTES } from 'const'
import { injectStyles } from 'utils/styles'
import Footer from './Footer'
import SignUpForm from './SignUpForm'

const styles = {
  signIn: {
    position: 'absolute',
    top: 40,
    right: 40,
  },
}
const SignUp = ({ classes }) => (
  <PageForm title="Sign Up">
    <div className={classes.signIn}>
      <TextButton
        color="solidGray"
        larger
        label="Sign In"
        href={createRouteUrl(ROUTES.auth.login)}
      />
    </div>
    <SignUpForm />
    <Footer />
  </PageForm>
)

export default injectStyles(styles)(SignUp)
