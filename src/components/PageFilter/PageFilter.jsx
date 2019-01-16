// @flow strict-local
import React from 'react'
import cx from 'classnames'
import IconFilter from 'material-ui-icons/Tune'
import Counter from 'components/kit/Counter'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    ...theme.fontMedium(18, 26),
    height: 34,
    color: 'rgba(37,43,67,0.4)',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: 'rgba(37,43,67,0.6)',
    },
  },
  rightIcon: {
    marginLeft: 15,
  },
})

const PageFilter = ({ classes, className, noLabel, count, ...otherProps }) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    {!noLabel && 'Filter'}
    {count > 0 ? (
      <Counter className={classes.rightIcon}>{count}</Counter>
    ) : (
      <IconFilter className={classes.rightIcon} />
    )}
  </div>
)

export default injectStyles(styles)(PageFilter)
