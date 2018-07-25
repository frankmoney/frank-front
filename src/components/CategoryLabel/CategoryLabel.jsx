import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import IconCircle from 'components/IconCircle'
import { categoryProps } from 'utils/limitCategories'

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
  value: {},
}

const CategoryLabel = ({
  classes,
  className,
  color,
  iconClassName,
  name,
  nameClassName,
  value,
  valueClassName,
  valueUnit,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    <IconCircle className={cx(classes.icon, iconClassName)} />
    <span className={cx(classes.name, nameClassName)}>{name}</span>
    {value && (
      <span className={cx(classes.value, valueClassName)}>
        {` ${value}`}
        {valueUnit && valueUnit}
      </span>
    )}
  </div>
)

CategoryLabel.propTypes = {
  ...categoryProps,
  iconClassName: PropTypes.string,
  nameClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  valueUnit: PropTypes.string,
}

export default injectStyles(styles)(CategoryLabel)
