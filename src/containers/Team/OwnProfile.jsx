import React from 'react'
import { Avatar, Button, TextField } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import { omitProps } from '@frankmoney/utils'
import cx from 'classnames'
import LockIcon from 'material-ui-icons/Lock'
import * as R from 'ramda'
import { compose, withStateHandlers } from 'recompose'
import ArrowPopup from 'components/ArrowPopup'
import { TEAM_ROLE_TITLES } from 'const'
import reconnect from 'utils/reconnect'
import Paper from './Paper'
import ACTIONS from './actions'
import styles from './OwnProfile.jss'

const OwnProfile = ({
  classes,
  className,
  profile: { email, lastName, firstName, avatar, role },
  changePasswordPopupAnchor,
  openChangePasswordPopup,
  handleNewPasswordChange,
  handleNewPasswordRepeatedChange,
  handleChangePasswordPopupClose,
  handleChangePasswordPopupSave,
  ...otherProps
}) => (
  <Paper className={cx(classes.root, className)} {...otherProps}>
    <div className={classes.avatar}>
      <Avatar
        className={classes.avatarComponent}
        src={R.prop('preview', avatar)}
      />
    </div>
    <div className={classes.info}>
      <div className={classes.name}>
        {firstName} {lastName}
      </div>
      <div className={email}>{email}</div>
    </div>
    <div className={classes.role}>{TEAM_ROLE_TITLES[role]}</div>
    <div className={classes.footer}>
      <Button
        className={classes.changePasswordButton}
        label="Change Password"
        icon={LockIcon}
        onClick={openChangePasswordPopup}
      />
      <ArrowPopup
        open={!!changePasswordPopupAnchor}
        anchorEl={changePasswordPopupAnchor}
        onClose={handleChangePasswordPopupClose}
      >
        <div className={classes.changePasswordPopup}>
          <div className={classes.changePasswordPopupField}>
            <TextField
              className={classes.changePasswordPopupInput}
              type="password"
              label="New password"
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className={classes.changePasswordPopupField}>
            <TextField
              className={classes.changePasswordPopupInput}
              type="password"
              label="Repeat password"
              onChange={handleNewPasswordRepeatedChange}
            />
          </div>
          <div className={classes.changePasswordPopupButtons}>
            <Button
              className={classes.changePasswordPopupButton}
              onClick={handleChangePasswordPopupClose}
            >
              Cancel
            </Button>
            <Button
              className={classes.changePasswordPopupButton}
              onClick={handleChangePasswordPopupSave}
            >
              Save
            </Button>
          </div>
        </div>
      </ArrowPopup>
    </div>
  </Paper>
)

export default compose(
  reconnect(null, {
    changePassword: ACTIONS.changePassword,
  }),
  withStateHandlers(
    {
      changePasswordPopupAnchor: null,
      newPassword: '',
      newPasswordRepeated: '',
    },
    {
      handleNewPasswordChange: () => event => ({
        newPassword: event.target.value,
      }),
      handleNewPasswordRepeatedChange: () => event => ({
        newPasswordRepeated: event.target.value,
      }),
      openChangePasswordPopup: () => event => ({
        changePasswordPopupAnchor: event.target,
      }),
      handleChangePasswordPopupClose: () => () => ({
        changePasswordPopupAnchor: null,
        newPassword: '',
        newPasswordRepeated: '',
      }),
      handleChangePasswordPopupSave: (
        { newPassword, newPasswordRepeated },
        { changePassword }
      ) => () => {
        if (newPassword && newPassword === newPasswordRepeated) {
          changePassword({ newPassword })
          return {
            changePasswordPopupAnchor: null,
            newPassword: '',
            newPasswordRepeated: '',
          }
        }
        return undefined
      },
    }
  ),
  injectStyles(styles),
  omitProps('theme', 'setChangePasswordPopupAnchor')
)(OwnProfile)
