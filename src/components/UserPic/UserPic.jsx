// @flow strict-local
import React from 'react'
import { Avatar, UploadButton, Uploader } from '@frankmoney/components'
import cx from 'classnames'
import { USER_COLORS } from 'const'
import { injectStyles } from 'utils/styles'
import Camera from './Camera.svg'

const styles = theme => ({
  root: {
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  avatar: {},
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ({ color }) => USER_COLORS[color],
    ...theme.fontMedium(20),
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    display: 'none',
    '$root:hover &': {
      display: 'flex',
    },
  },
})

const Overlay = ({ overlayClassName }) => (
  <div className={overlayClassName}>
    <Camera />
  </div>
)

const UserPic = ({
  classes,
  className,
  avatar,
  lastName,
  firstName,
  editable,
  uploaderName,
  onChange,
}) => {
  const body =
    avatar && avatar.preview ? (
      <Avatar className={cx(classes.avatar, className)} src={avatar.preview} />
    ) : (
      <div className={cx(classes.circle, className)}>
        {firstName[0].toUpperCase()}
        {lastName && lastName[0].toUpperCase()}
      </div>
    )

  return editable ? (
    <Uploader name={uploaderName} accept={['image/*']} uploadFile={onChange}>
      <div className={classes.root}>
        {body}
        <UploadButton component={Overlay} overlayClassName={classes.overlay} />
      </div>
    </Uploader>
  ) : (
    <div className={classes.root}>{body}</div>
  )
}

export default injectStyles(styles)(UserPic)
