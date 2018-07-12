import React from 'react'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {},
}

const Footer = ({ classes, ...otherProps }) => (
  <div className={classes.root} {...otherProps} />
)

export default injectStyles(styles)(Footer)
