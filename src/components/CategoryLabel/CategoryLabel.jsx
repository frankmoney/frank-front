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
    height: 16,
    width: 16,
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
  counterClassName,
  counterUnit,
  iconClassName,
  name,
  nameClassName,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    <IconCircle className={cx(classes.icon, iconClassName)} />
    <span className={cx(classes.name, nameClassName)}>{name}</span>
    {counter && (
      <span className={cx(classes.counter, counterClassName)}>
        {` ${counter}`}
        {counterUnit && counterUnit}
      </span>
    )}
  </div>
)

export const categoryPropTypes = {
  color: PropTypes.string,
  counter: PropTypes.number,
  name: PropTypes.string.isRequired,
}

CategoryLabel.propTypes = {
  ...categoryPropTypes,
  counterClassName: PropTypes.string,
  counterUnit: PropTypes.string,
  iconClassName: PropTypes.string,
  nameClassName: PropTypes.string,
}

export default injectStyles(styles)(CategoryLabel)
