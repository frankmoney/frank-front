import React from 'react'
import cx from 'classnames'
import UserPic from 'components/UserPic'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    height: 120,
    display: 'flex',
    padding: [0, 0],
    alignItems: 'center',
  },
  userPicWrapper: {
    marginRight: 17,
  },
  userPic: {
    width: 60,
    height: 60,
    ...theme.fontMedium(20),
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
  color,
  avatar,
  firstName,
  lastName,
  email,
}) => (
  <div className={cx(classes.root, className)}>
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
  </div>
)

export default injectStyles(styles)(Member)
