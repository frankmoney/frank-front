import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {},
}

const FilterValue = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>FilterValue</div>
)

export default injectStyles(styles)(FilterValue)
