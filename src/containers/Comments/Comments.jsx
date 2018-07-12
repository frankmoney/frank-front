import * as R from 'ramda'
import React from 'react'
import cx from 'classnames'
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

const testComments = [
  {
    user: { name: 'David Liberman' },
    date: '2 days ago', // TODO: calculate from real date
    text:
      '@Suzie Alexander Ask me to name the best laptops on the market, and my answer would be some ordering of Apple’s MacBook Pro, Microsoft’s Surface Laptop and Surface Book',
  },
  {
    user: { name: 'Suzie Alexander' },
    date: '7 days ago',
    text:
      'Whether Facebook, Twitter, and Google have intentionally censored conservative users.',
  },
]

class Comments extends React.Component {
  state = {
    comments: testComments,
  }

  render() {
    const { classes, className } = this.props
    const comments = R.map(c => <Comment comment={c} />, this.state.comments)
    return <div className={cx(classes.root, className)}>{comments}</div>
  }
}

export default injectStyles(styles)(Comments)
