import React from 'react'
import { Avatar, Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import { omitProps } from '@frankmoney/utils'
import cx from 'classnames'
import LockIcon from 'material-ui-icons/Lock'
import * as R from 'ramda'
import { compose } from 'recompose'
import { ROLES } from 'const'
import reconnect from 'utils/reconnect'
import Paper from './Paper'
import ACTIONS from './actions'
import styles from './OwnProfile.jss'

const OwnProfile = ({
  classes,
  className,
  profile: { email, lastName, firstName, avatar, role },
  openChangePasswordPopup,
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
    <div className={classes.role}>{ROLES.get(role).title}</div>
    <div className={classes.footer}>
      <Button
        className={classes.changePasswordButton}
        label="Change Password"
        icon={LockIcon}
        onClick={openChangePasswordPopup}
      />
    </div>
  </Paper>
)

export default compose(
  reconnect(null, {
    openChangePasswordPopup: ACTIONS.openChangePasswordPopup,
  }),
  injectStyles(styles),
  omitProps('theme')
)(OwnProfile)
