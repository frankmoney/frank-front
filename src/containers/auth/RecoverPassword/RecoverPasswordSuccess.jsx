// @flow strict-local
import React from 'react'
import PageForm from 'components/PageForm'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  message: {
    textAlign: 'center',
    ...theme.fontSemibold(40),
  },
})

const RecoverPasswordSuccess = ({ classes, className }) => (
  <PageForm className={className} centered>
    <div className={classes.message}>Reset password letter sent</div>
  </PageForm>
)

export default injectStyles(styles)(RecoverPasswordSuccess)
