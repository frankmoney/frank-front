// @flow strict-local
import React from 'react'
import { Avatar } from '@frankmoney/components'
import cx from 'classnames'
import { USER_COLORS } from 'const'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  avatar: {},
  circle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: ({ color }) => USER_COLORS[color],
    ...theme.fontMedium(20),
  },
})

const UserPic = ({ classes, className, avatar, lastName, firstName }) =>
  avatar && avatar.preview ? (
    <Avatar className={cx(classes.avatar, className)} src={avatar.preview} />
  ) : (
    <div className={cx(classes.circle, className)}>
      {firstName[0].toUpperCase()}
      {lastName && lastName[0].toUpperCase()}
    </div>
  )

export default injectStyles(styles)(UserPic)
