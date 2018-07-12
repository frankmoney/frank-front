import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const USERPIC_SIZE = 40

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    display: 'flex',
    '&:not(:last-child)': { marginBottom: 45 },
  },
  userpic: {
    height: USERPIC_SIZE,
    width: USERPIC_SIZE,
    minHeight: USERPIC_SIZE,
    minWidth: USERPIC_SIZE,
    background: 'gray',
    borderRadius: '50%',
    position: 'relative',
    top: 4,
  },
  username: {
    color: '#20284A',
    ...theme.fontMedium(16, 16),
    display: 'inline-flex',
  },
  date: { color: '#B6B9C4', display: 'inline-flex', marginLeft: 7 },
  text: { color: '#60667E' },
  container: {
    display: 'flex',
    marginLeft: 25,
    flexDirection: 'column',
  },
  header: {},
})

const Comment = ({ classes, className, comment }) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.userpic} />
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.username}>{comment.user.name}</div>
        <div className={classes.date}>{comment.date}</div>
      </div>
      <div className={classes.text}>{comment.text}</div>
    </div>
  </div>
)

export default injectStyles(styles)(Comment)
