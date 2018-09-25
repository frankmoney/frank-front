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
  container: {
    display: 'flex',
    marginLeft: 25,
    flexDirection: 'column',
    width: '100%',
  },
})

const CommentBase = ({ classes, className, children, key, picture }) => (
  <div className={cx(classes.root, className)} key={key}>
    <img
      src={picture}
      className={classes.userpic}
      alt={`${picture}'s avatar`}
    />
    <div className={classes.container}>{children}</div>
  </div>
)

CommentBase.propTypes = {
  picture: PropTypes.string,
}

export default injectStyles(styles)(CommentBase)
