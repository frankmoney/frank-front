import React from 'react'
import { Avatar, Select2 } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import { omitProps } from '@frankmoney/utils'
import cx from 'classnames'
import * as R from 'ramda'
import { compose, withPropsOnChange } from 'recompose'
import { ORDERED_TEAM_ROLES, TEAM_ROLE_TITLES } from 'const'
import reconnect from 'utils/reconnect'
import ACTIONS from './actions'
import styles from './Profile.jss'

const deleteRoleSelectValue = '#delete'

const Profile = ({
  classes,
  className,
  profile: { email, lastName, firstName, avatar, role },
  acl: { remove, editRole },
  roles,
  onMenuSelectChange,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
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
    <div className={classes.role}>
      <Select2
        className={classes.menu}
        value={role || 'observer'}
        disabled={!remove && !editRole}
        onChange={onMenuSelectChange}
      >
        {roles.map(x => (
          <Select2.Option key={x} value={x}>
            {TEAM_ROLE_TITLES[x]}
          </Select2.Option>
        ))}
        {remove && (
          <Select2.Option
            key={deleteRoleSelectValue}
            className={classes.menuDeleteUserItem}
            value={deleteRoleSelectValue}
          >
            Delete user
          </Select2.Option>
        )}
      </Select2>
    </div>
  </div>
)

export default compose(
  reconnect(null, { remove: ACTIONS.remove, updateRole: ACTIONS.updateRole }),
  withPropsOnChange(
    ['profile', 'remove', 'updateRole'],
    ({ profile: { pid }, remove, updateRole }) => ({
      onMenuSelectChange: role => {
        if (role === deleteRoleSelectValue) {
          remove({ pid })
        } else {
          updateRole({ pid, role })
        }
      },
    })
  ),
  withPropsOnChange(
    ['profile'],
    ({ profile: { role }, acl: { editRole } }) => ({
      roles: editRole ? ORDERED_TEAM_ROLES : [role],
    })
  ),
  injectStyles(styles),
  omitProps('theme', 'remove', 'updateRole')
)(Profile)