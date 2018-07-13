import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
import { compose, branch, renderNothing } from 'recompose'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import Comment from './Comment'

const INBOX_CARD_PADDING = 40
const BORDER_RADIUS = 8

const styles = {
  root: {
    background: '#F6F7F8',
    margin: [INBOX_CARD_PADDING, -INBOX_CARD_PADDING, -INBOX_CARD_PADDING],
    padding: [30, INBOX_CARD_PADDING, INBOX_CARD_PADDING],
    borderRadius: [0, 0, BORDER_RADIUS, BORDER_RADIUS],
  },
}

class Comments extends React.Component {
  state = {
    comments: this.props.comments,
  }

  render() {
    const { canPost, classes, className, user } = this.props
    const comments = R.map(
      c => <Comment user={c.user} comment={c.comment} key={c.id} />,
      this.state.comments
    )
    return (
      <div className={cx(classes.root, className)}>
        {comments}
        {canPost && <Comment user={user} isNewPost />}
      </div>
    )
  }
}

Comments.propTypes = {
  canPost: PropTypes.bool,
  comments: PropTypes.arrayOf(Comment.propTypes),
  open: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
}

Comments.defaultProps = {
  canPost: true,
  comments: [],
}

export default compose(
  branch(
    R.compose(
      R.not,
      R.prop('open')
    ),
    renderNothing
  ),
  injectStyles(styles)
)(Comments)
