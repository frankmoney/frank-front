// @flow strict-local
import React from 'react'
import { createRouteUrl } from '@frankmoney/utils'
import { ROUTES } from 'const'
import PageForm from 'components/PageForm'
import Button from 'components/kit/Button'
import { injectStyles } from 'utils/styles'
import Logo from './ResetPasswordSuccessLogo.svg'

const styles = theme => ({
  logo: {
    display: 'block',
    margin: 'auto',
  },
  message: {
    textAlign: 'center',
    ...theme.fontSemibold(40),
  },
  button: {
    marginTop: 35,
  },
})

const ResetPasswordMailSent = ({ classes, className }) => (
  <PageForm className={className} centered>
    <Logo className={classes.logo} />
    <div className={classes.message}>Your password has been changed</div>
    <Button
      className={classes.button}
      type="submit"
      color="green"
      label="Sign In via new password"
      stretch
      href={createRouteUrl(ROUTES.auth.login)}
    />
  </PageForm>
)

export default injectStyles(styles)(ResetPasswordMailSent)
