// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { Delete as RemoveIcon } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'
import reconnect from 'utils/reconnect'
import { IconButton } from 'components/kit/Button'
import TextTooltip from 'components/kit/TextTooltip'
import Dialog from 'components/kit/Dialog'
import UserPic from 'components/UserPic'
import DeleteMemberDialog from './DeleteMemberDialog'
import ACTIONS from './actions'
import styles from './Profile.jss'

const Profile = ({
  classes,
  className,
  profile: { email, lastName, firstName, color, avatar },
  acl,
  onRemove,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
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
    {acl.remove && (
      <Dialog.State>
        {({ open, toggle }) => (
          <>
            <TextTooltip
              text="Delete teammate"
              place="up"
              align="center"
              appearTimeout={300}
            >
              <IconButton
                className={classes.removeButton}
                icon={<RemoveIcon />}
                onClick={() => toggle(true)}
              />
            </TextTooltip>
            <DeleteMemberDialog
              open={open}
              onClose={() => toggle(false)}
              onConfirm={onRemove}
            />
          </>
        )}
      </Dialog.State>
    )}
  </div>
)

export default compose(
  reconnect(null, { onRemove: ACTIONS.remove }),
  injectStyles(styles)
)(Profile)
