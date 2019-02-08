import React from 'react'
import cx from 'classnames'
import { ArrowDropDown } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    color: 'rgba(37, 43, 67, 0.4)',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    transition: theme.transition('color'),
    '&:hover, $hovered': {
      color: 'rgba(37, 43, 67, 0.7)',
    },
  },
  value: {
    ...theme.fontMedium(18, 26),
  },
  arrow: {
    marginLeft: 5,
  },
  active: {
    color: 'rgba(37, 43, 67, 0.7)',
  },
})

class SelectValue extends React.Component {
  render() {
    const {
      classes,
      className,
      theme,
      value,
      stretch,
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

export default injectStyles(styles)(SelectValue)
