import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import placeholder from './stories-placeholder.jpg'

const styles = {
  root: {
    background: `url("${placeholder}")`,
    height: '100%',
    width: '100%',
  },
}

const StoriesPlaceholder = ({ classes, className }) => (
  <div className={cx(classes.root, className)} />
)

export default injectStyles(styles)(StoriesPlaceholder)
