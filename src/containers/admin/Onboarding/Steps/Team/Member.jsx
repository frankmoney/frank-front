import { Avatar } from '@frankmoney/components'
import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    height: 120,
    display: 'flex',
    padding: [0, 0],
    alignItems: 'center',
  },
  avatar: {
    marginRight: 17,
  },
  avatarComponent: {
    width: 60,
    height: 60,
  },
  info: {
    flex: 1,
  },
  name: {
    ...theme.fontMedium(22, 31),
    color: '#252B43',
  },
  email: {
    color: 'rgba(37,43,67,0.4)',
    ...theme.fontRegular(20),
  },
})

const Member = ({
  classes,
  className,
  avatarUrl,
  firstName,
  lastName,
  email,
}) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.avatar}>
      <Avatar className={classes.avatarComponent} src={avatarUrl} />
    </div>
    <div className={classes.info}>
      <div className={classes.name}>
        {firstName} {lastName}
      </div>
      <div className={classes.email}>{email}</div>
    </div>
  </div>
)

export default injectStyles(styles)(Member)
