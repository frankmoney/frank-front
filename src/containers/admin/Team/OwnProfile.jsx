// @flow strict-local
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import LockIcon from 'material-ui-icons/Lock'
import { Avatar } from '@frankmoney/components'
import { compose, withStateHandlers } from 'recompose'
import TextField from 'components/kit/TextField'
import ArrowPopup from 'components/ArrowPopup'
import Button from 'components/kit/Button'
import ToggleButton from 'components/kit/ToggleButton'
import { TEAM_ROLE_TITLES } from 'const'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
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
  // omit
  changePassword,
  newPassword,
  newPasswordRepeated,
  theme,
  //
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
    <div className={classes.footer}>
      <ArrowPopup
        className={classes.changePasswordPopup}
        place="right"
        button={
          <ToggleButton
            className={classes.changePasswordButton}
            label="Change Password"
            icon={<LockIcon />}
          />
        }
      >
        {({ closePopup }) => (
          <>
            <div className={classes.changePasswordPopupField}>
              <TextField
                className={classes.changePasswordPopupInput}
                type="password"
                floatingLabel="New password"
                onChange={handleNewPasswordChange}
              />
            </div>
            <div className={classes.changePasswordPopupField}>
              <TextField
                className={classes.changePasswordPopupInput}
                type="password"
                floatingLabel="Repeat password"
                onChange={handleNewPasswordRepeatedChange}
              />
            </div>
            <div className={classes.changePasswordPopupButtons}>
              <Button
                label="Cancel"
                className={classes.changePasswordPopupButton}
                onClick={closePopup}
              />
              <Button
                label="Save"
                color="green"
                className={classes.changePasswordPopupButton}
                onClick={handleChangePasswordPopupSave}
              />
            </div>
          </>
        )}
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
      handleNewPasswordChange: () => value => ({
        newPassword: value,
      }),
      handleNewPasswordRepeatedChange: () => value => ({
        newPasswordRepeated: value,
      }),
      openChangePasswordPopup: () => () => ({}),
      handleChangePasswordPopupClose: () => () => ({
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
  injectStyles(styles)
)(OwnProfile)
