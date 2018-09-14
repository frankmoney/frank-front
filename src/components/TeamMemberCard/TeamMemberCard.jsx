import React from 'react'
import { Avatar, Button, IconButton } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import LockIcon from 'material-ui-icons/Lock'
import * as R from 'ramda'
import styles from './TeamMemberCard.jss'

const TeamMemberCard = ({
  classes,
  admin,
  email,
  lastName,
  firstName,
  avatar,
  large,
  acl: { remove, editRole, editProfile, changePassword },
  onEditRoleClick,
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
            onClick={onEditRoleClick}
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

export default injectStyles(styles)(TeamMemberCard)
