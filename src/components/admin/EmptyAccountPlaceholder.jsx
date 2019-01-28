// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    color: '#D2D2D5',
    ...theme.fontSemibold(60),
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
})

const EmptyAccountPlaceholder = ({ classes, className, text }) => (
  <div className={cx(classes.root, className)}>{text}</div>
)

EmptyAccountPlaceholder.defaultProps = {
  text: 'No payments yet',
}

export default injectStyles(styles)(EmptyAccountPlaceholder)
