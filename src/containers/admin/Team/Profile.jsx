import React from 'react'
import { Avatar } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import * as R from 'ramda'
import { compose } from 'recompose'
import { Delete as RemoveIcon } from 'material-ui-icons'
import reconnect from 'utils/reconnect'
import { IconButton } from 'components/kit/Button'
import TextTooltip from 'components/kit/TextTooltip'
import ACTIONS from './actions'
import styles from './Profile.jss'

const Profile = ({
  classes,
  className,
  profile: { email, lastName, firstName, avatar },
  acl,
  onRemove,
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
    {acl.remove && (
      <TextTooltip text="Delete teammate" place="up" align="center">
        <IconButton
          className={classes.removeButton}
          icon={<RemoveIcon />}
          onClick={() => onRemove()}
        />
      </TextTooltip>
    )}
  </div>
)

export default compose(
  reconnect(null, { onRemove: ACTIONS.remove }),
  injectStyles(styles)
)(Profile)
