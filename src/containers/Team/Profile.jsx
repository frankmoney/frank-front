import React from 'react'
import { Avatar, Button, IconButton } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import LockIcon from 'material-ui-icons/Lock'
import * as R from 'ramda'

const styles = theme => ({
  root: {
    padding: 30,
    '&:hover $roleWrap': {
      display: ({ large, acl: { remove, editRole } }) =>
        !large && (remove || editRole) ? 'none' : 'block',
    },
    '&:hover $overlay': {
      display: ({ large, acl: { remove, editRole } }) =>
        !large && (remove || editRole) ? 'flex' : 'none',
    },
  },
  body: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarWrap: {
    marginRight: 15,
  },
  avatar: {
    width: ({ large }) => (large ? 90 : 60),
    height: ({ large }) => (large ? 90 : 60),
  },
  mainWrap: {
    flex: 1,
  },
  name: {
    ...theme.fontMedium(22, 34),
  },
  nameLarge: {
    ...theme.fontMedium(28, 46),
  },
  edit: {
    marginTop: 13,
    verticalAlign: 'top',
  },
  editIcon: {
    width: 22,
    height: 22,
  },
  email: {
    color: 'rgba(37, 43, 67, .5)',
    ...theme.fontRegular(18),
  },
  roleWrap: {
    textAlign: 'right',
    ...theme.fontRegular(18, 46),
  },
  admin: {
    color: '#21CB61',
  },
  overlay: {
    display: 'none',
    alignItems: 'center',
  },
  editRoleButton: {
    extend: 'button',
    '&:hover': {
      extend: 'buttonActive',
    },
    '&:active': {
      extend: 'buttonActive',
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  changePasswordButton: {
    extend: 'button',
    '&:hover': {
      extend: 'buttonActive',
    },
    '&:active': {
      extend: 'buttonActive',
    },
  },
  removeButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  removeIcon: {
    width: 22,
    height: 22,
  },
  button: {
    ...theme.fontMedium(16, 22),
    backgroundColor: 'rgba(37, 43, 67, 0.04)',
    border: 0,
  },
  buttonActive: {
    backgroundColor: 'rgba(37, 43, 67, 0.04)',
    border: 0,
    color: '#4C51F3',
  },
})

const Profile = ({
  classes,
  id,
  admin,
  email,
  lastName,
  firstName,
  avatar,
  large,
  acl: { remove, editRole, editProfile, changeAvatar, changePassword },
  onEditRole,
}) => (
  <div className={classes.root}>
    <div className={classes.body}>
      <div className={classes.avatarWrap}>
        <Avatar className={classes.avatar} src={R.prop('preview', avatar)} />
      </div>
      <div className={classes.mainWrap}>
        <div className={large ? classes.nameLarge : classes.name}>
          {firstName} {lastName}
          {editProfile && (
            <>
              {' '}
              <IconButton
                className={classes.edit}
                iconClassName={classes.editIcon}
                icon={EditIcon}
              />
            </>
          )}
        </div>
        <div className={classes.email}>{email}</div>
      </div>
      <div className={classes.roleWrap}>
        {admin && <span className={classes.admin}>Administrator</span>}
      </div>
      {(remove || editRole) && (
        <div className={classes.overlay}>
          <Button
            className={classes.editRoleButton}
            label="Edit role"
            icon={EditIcon}
            onClick={() => onEditRole && onEditRole({ id })}
          />
          {remove && (
            <IconButton
              className={classes.removeButton}
              iconClassName={classes.removeIcon}
              icon={DeleteIcon}
              round
            />
          )}
        </div>
      )}
    </div>
    {large &&
      (remove || changePassword) && (
        <div className={classes.footer}>
          <Button
            className={classes.changePasswordButton}
            label="Change Password"
            icon={LockIcon}
          />
          <IconButton
            className={classes.removeButton}
            iconClassName={classes.removeIcon}
            icon={DeleteIcon}
            round
          />
        </div>
      )}
  </div>
)

export default injectStyles(styles)(Profile)
