/* eslint-disable global-require */
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = {
  root: {
    width: 100,
  },
}

const Logo = ({ className, inverted, classes }) => (
  <img
    src={
      inverted
        ? require('./frank_logo_white.png')
        : require('./frank_logo_black.png')
    }
    alt="frank logo"
    className={cx(classes.root, className)}
  />
)

export default injectStyles(styles)(Logo)
