import React from 'react'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import CommentBase from './CommentBase'

const styles = theme => ({
  username: {
    color: '#20284A',
    ...theme.fontMedium(16, 16),
    display: 'inline-flex',
  },
  date: { color: '#B6B9C4', display: 'inline-flex', marginLeft: 7 },
  text: { color: '#60667E' },
  header: {},
})

const Comment = ({ classes, className, comment, key, user }) => (
  <CommentBase className={className} key={key} picture={user.picture}>
    <div className={classes.header}>
      <div className={classes.username}>{user.name}</div>
      <div className={classes.date}>{comment.date}</div>
    </div>
    <div className={classes.text}>{comment.text}</div>
  </CommentBase>
)

Comment.propTypes = {
  comment: PropTypes.exact({
    date: PropTypes.any, // TODO: settle on type
    text: PropTypes.string,
  }),
  user: PropTypes.exact({
    picture: PropTypes.string,
    name: PropTypes.string,
  }),
}

export default injectStyles(styles)(Comment)
