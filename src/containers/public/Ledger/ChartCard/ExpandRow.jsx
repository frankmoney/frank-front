import React from 'react'
import cx from 'classnames'
import { ArrowDropUp, ArrowDropDown } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  expandContainer: {},
  expander: {
    alignItems: 'center',
    color: 'rgba(0,0,0,0.4)',
    cursor: 'pointer',
    display: 'flex',
    margin: [27, 0, 0],
    position: 'relative',
  },
  title: {
    ...theme.fontRegular(22, 22),
    flex: [2, 1],
  },
  expanderIcon: {
    height: 22,
    position: 'absolute',
    right: -4,
    top: 1,
    width: 22,
  },
})

const ExpandRow = ({
  className,
  classes,
  title,
  expanded,
  children,
  onToggle,
}) => (
  <div className={cx(classes.expandContainer, className)}>
    <div className={classes.expander} onClick={() => onToggle(!expanded)}>
      <div className={classes.title}>{title}</div>
      {React.createElement(expanded ? ArrowDropUp : ArrowDropDown, {
        className: classes.expanderIcon,
      })}
    </div>
    {expanded && children}
  </div>
)

export default injectStyles(styles)(ExpandRow)
