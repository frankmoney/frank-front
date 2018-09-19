import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
  },
}

const AboutTab = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>TODO</div>
)

export default injectStyles(styles)(AboutTab)
