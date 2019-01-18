// @flow strict-local
import React from 'react'
import cx from 'classnames'
import LockIcon from 'material-ui-icons/Lock'
import { compose, withHandlers } from 'recompose'
import ToggleButton from 'components/kit/ToggleButton'
import UserPic from 'components/UserPic'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import Paper from './Paper'
import ACTIONS from './actions'
import styles from './OwnProfile.jss'
import ChangePasswordPopupDialog from './ChangePasswordPopupDialog'

const OwnProfile = ({
  classes,
  className,
  profile: { email, lastName, firstName, color, avatar },
  changePasswordPopupAnchor,
  openChangePasswordPopup,
  handleNewPasswordChange,
  handleNewPasswordRepeatedChange,
  handleChangePasswordPopupClose,
  handleChangePasswordPopupSave,
  changePassword,
  handleChangePasswordSubmit,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <div className={classes.userPicWrapper}>
      <UserPic
        className={classes.userPic}
        avatar={avatar}
        color={color}
        lastName={lastName}
        firstName={firstName}
      />
    </div>
    <div className={classes.info}>
      <div className={classes.name}>
        {firstName} {lastName}
      </div>
      <div className={classes.email}>{email}</div>
    </div>
    <div className={classes.footer}>
      <ChangePasswordPopupDialog onConfirm={handleChangePasswordSubmit}>
        <ToggleButton label="Change Password" icon={<LockIcon />} />
      </ChangePasswordPopupDialog>
    </div>
  </Paper>
)

export default compose(
  reconnect(null, {
    changePassword: ACTIONS.changePassword,
  }),
  withHandlers({
    handleChangePasswordSubmit: props => newPassword => {
      props.changePassword({ newPassword })
    },
  }),
  injectStyles(styles)
)(OwnProfile)
