import React from 'react'
import {
  Avatar,
  CheckedMenuItem,
  TableCell,
  TableRow,
} from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, withPropsOnChange } from 'recompose'
import SelectField from 'components/SelectField'
import styles from './TeamMembersTableRow.jss'

const TeamMembersTableRow = ({
  theme,
  classes,
  className,
  data: { email, lastName, firstName, avatar, role },
  onMenuSelectChange,
  ...otherProps
}) => (
  <TableRow className={cx(classes.root, className)} {...otherProps}>
    <TableCell className={classes.avatar} name="avatar">
      <Avatar className={classes.avatarBody} src={R.prop('preview', avatar)} />
    </TableCell>
    <TableCell className={classes.info} name="info">
      <div className={classes.name}>
        {firstName} {lastName}
      </div>
      <div className={classes.email}>{email}</div>
    </TableCell>
    <TableCell className={classes.role} name="role">
      <SelectField
        className={classes.menu}
        value={role || 'observer'}
        onChange={onMenuSelectChange}
      >
        <CheckedMenuItem value="administrator">Administrator</CheckedMenuItem>
        <CheckedMenuItem value="manager">Manager</CheckedMenuItem>
        <CheckedMenuItem value="observer">Observer</CheckedMenuItem>
        <CheckedMenuItem className={classes.menuDeleteUser} value="delete">
          Delete user
        </CheckedMenuItem>
      </SelectField>
    </TableCell>
  </TableRow>
)

export default compose(
  connect(
    null,
    dispatch =>
      bindActionCreators(
        {
          updateRole: ACTIONS.updateRole,
        },
        dispatch
      )
  ),
  withHandlers({
    onRoleChange: ({ data: { id }, updateRole }) => role =>
      updateRole({ id, role }),
  }),
  withPropsOnChange(
    ['onRoleChange', 'onUserDelete'],
    ({ onRoleChange, onUserDelete }) => ({
      onMenuSelectChange: event => {
        if (event.target.value === 'delete') {
          onUserDelete()
        } else {
          onRoleChange(event.target.value)
        }
      },
    })
  ),
  injectStyles(styles)
)(TeamMembersTableRow)
