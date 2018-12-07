// @flow strict-local
import React from 'react'
import cx from 'classnames'
import IconFilter from 'material-ui-icons/Tune'
import Counter from 'components/kit/Counter/index'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    ...theme.fontMedium(18, 26),
    height: 34,
    color: 'rgb(37,43,67,0.4)',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '30px!important',
    transition: theme.transition('color'),
    '&:not($on):hover': {
      color: 'rgb(37,43,67,0.6)',
    },
  },
  icon: {
    height: 24,
    width: 24,
  },
  counter: {
    marginLeft: 10,
  },
  on: {
    color: 'rgb(37,43,67,1)',
  },
})

const DrawerFilter = ({ classes, on, className, count, ...otherProps }) => (
  <div
    className={cx(classes.root, { [classes.on]: on }, className)}
    {...otherProps}
  >
    <IconFilter className={classes.icon} />
    {count > 0 && <Counter className={classes.counter}>{count}</Counter>}
  </div>
)

export default injectStyles(styles)(DrawerFilter)
