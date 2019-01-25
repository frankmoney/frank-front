// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import { injectStyles } from 'utils/styles'
import Logo from './RecoverPasswordSuccessLogo.svg'

const styles = theme => ({
  root: {
    width: '100%',
  },
  logo: {
    display: 'block',
    margin: 'auto',
  },
  message: {
    textAlign: 'center',
    ...theme.fontSemibold(40),
  },
})

const RecoverPasswordSuccess = ({ classes, sentTo }) => (
  <PageForm centered stretchHorizontally>
    <Logo className={classes.logo} />
    <div className={classes.message}>
      Password reset link sent to<br />
      {sentTo}
    </div>
  </PageForm>
)

export default injectStyles(styles)(RecoverPasswordSuccess)
