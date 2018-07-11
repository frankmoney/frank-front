import React from 'react'
import cx from 'classnames'
import { ArrowDropUp, ArrowDropDown } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  expandContainer: {},
  expander: {
    display: 'flex',
    height: 80,
    alignItems: 'center',
    padding: [0, 30],
    color: 'rgba(0,0,0,0.4)',
    cursor: 'pointer',
  },
  title: {
    ...theme.fontRegular(22, 22),
    flex: [2, 1],
  },
  expanderIcon: {
    width: 20,
    height: 20,
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
