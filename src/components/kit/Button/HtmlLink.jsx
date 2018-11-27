// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  resetStyles: {
    textDecoration: 'none',
  },
}

const HtmlLink = ({ classes, className, ...props }) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a className={cx(classes.resetStyles, className)} {...props} />
)

export default injectStyles(styles)(HtmlLink)
