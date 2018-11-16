import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { ArrowDropDown } from 'material-ui-icons'

const styles = theme => ({
  root: {
    color: '#20284A',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
  },
  value: {
    minHeight: 26,
    ...theme.fontRegular(18, 26),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    flexGrow: 1,
  },
  arrow: {
    marginLeft: 5,
    color: 'rgba(37, 43, 67, 0.2)',
    flexShrink: 0,
  },
  active: {
    '& $arrow': {
      color: '#4C51F3',
    },
  },
})

class SelectFieldControl extends React.Component {
  render() {
    const {
      classes,
      className,
      theme,
      value,
      controlRef,
      active,
      ...otherProps
    } = this.props

    return (
      <div
        ref={controlRef}
        className={cx(classes.root, active && classes.active, className)}
        {...otherProps}
      >
        <div className={classes.value}>{value}</div>
        <ArrowDropDown className={classes.arrow} />
      </div>
    )
  }
}

export default injectStyles(styles)(SelectFieldControl)
