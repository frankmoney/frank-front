import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
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
    maxHeight: USERPIC_SIZE,
    maxWidth: USERPIC_SIZE,
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
  newPost: {
    ...theme.fontRegular(18, 26),
    color: '#B7BAC2',
    position: 'relative',
    top: 10,
    left: 2,
    cursor: 'pointer',
  },
})

const Comment = ({ classes, className, comment, isNewPost, user }) => (
  <div className={cx(classes.root, className)}>
    <img
      src={user.picture}
      className={classes.userpic}
      alt={`${user.pic}'s avatar`}
    />
    <div className={classes.container}>
      {isNewPost && <div className={classes.newPost}>Leave a comment…</div>}
      {!isNewPost && (
        <>
          <div className={classes.header}>
            <div className={classes.username}>{user.name}</div>
            <div className={classes.date}>{comment.date}</div>
          </div>
          <div className={classes.text}>{comment.text}</div>
        </>
      )}
    </div>
  </div>
)

Comment.propTypes = {
  comment: PropTypes.exact({
    date: PropTypes.any, // TODO: settle on type
    text: PropTypes.string,
  }),
  isNewPost: PropTypes.new,
  user: PropTypes.exact({
    picture: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default injectStyles(styles)(Comment)
