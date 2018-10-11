import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import { MoveToInbox as VerifyEmailIcon } from 'material-ui-icons'
import { CircularProgress } from 'material-ui/Progress'
import styles from './SideBarVerifyEmail.jss'

const SideBarVerifyEmail = ({
  classes,
  isSending,
  isSent,
  onResend,
  userEmail,
  className,
}) => (
  <div className={cx(classes.verifyEmail, className)}>
    <VerifyEmailIcon className={classes.icon} />
    <div className={classes.message}>
      {!isSent ? 'Please check your inbox' : 'Confirmation was sent to'}
      <br />
      <span className={classes.messageEmphasize}>{userEmail}</span>
    </div>
    {isSending ? (
      <CircularProgress className={classes.loader} size={20} />
    ) : (
      !isSent && (
        <div
          role="button"
          tabIndex={0}
          className={classes.button}
          onClick={onResend}
        >
          Resend
        </div>
      )
    )}
  </div>
)

export default compose(injectStyles(styles))(SideBarVerifyEmail)
