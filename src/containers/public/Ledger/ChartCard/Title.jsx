import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import FilterButton from '../FilterButton'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.fontRegular(22, 22),
    padding: 0,
    margin: [-1, 0, 30],
  },
})

const Title = ({ children, classes, className }) => (
  <div className={cx(classes.root, className)}>
    <h2 className={classes.title}>{children}</h2>
    <FilterButton />
  </div>
)

export default injectStyles(styles)(Title)
