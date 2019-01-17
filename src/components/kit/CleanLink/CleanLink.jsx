// @flow strict-local
import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  resetStyles: {
    textDecoration: 'none',
  },
}

const CleanLink = ({ classes, className, href, external, ...props }) =>
  external ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a className={cx(classes.resetStyles, className)} href={href} {...props} />
  ) : (
    <Link className={cx(classes.resetStyles, className)} to={href} {...props} />
  )

CleanLink.defaultProps = {
  external: false,
}

export default injectStyles(styles)(CleanLink)
