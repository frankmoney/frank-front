import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import IconCircle from 'components/IconCircle'

const styles = {
  root: {
    color: ({ color }) => color,
  },
  icon: {
    width: ({ size }) => size,
    height: ({ size }) => size,
    marginRight: 10,
  },
  name: {},
  counter: {},
}

const CategoryLabel = ({
  classes,
  className,
  color,
  counter,
  counterUnit,
  name,
  size,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    <IconCircle className={classes.icon} />
    <span className={classes.name}>{name}</span>
    {counter && (
      <span className={classes.counter}>
        {` ${counter}`}
        {counterUnit && counterUnit}
      </span>
    )}
  </div>
)

CategoryLabel.propTypes = {
  color: PropTypes.string,
  counter: PropTypes.number,
  counterUnit: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
}

export default injectStyles(styles)(CategoryLabel)
