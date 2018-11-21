import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  circle: {
    borderRadius: '50%',
    height: 16,
    width: 16,
    marginRight: 10,
    flexShrink: 0,
  },
  name: {
    ...theme.fontMedium(22, 26),
    whiteSpace: 'no-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
})

const CategorySelectValue = ({ classes, className, name, color }) => (
  <div className={cx(classes.root, className)}>
    <div
      className={classes.circle}
      style={{
        backgroundColor: color,
      }}
    />
    <div className={classes.name} style={{ color }}>
      {name}
    </div>
  </div>
)

export default injectStyles(styles)(CategorySelectValue)
