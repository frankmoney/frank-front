import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import HighlightText from 'components/HighlightText'
import IconCircle from 'components/IconCircle'

const styles = {
  root: {
    alignItems: 'center',
    color: ({ color }) => color,
    display: 'flex',
    outline: 'none',
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 10,
  },
  name: {},
  value: {
    marginLeft: 4,
    opacity: 0.55,
  },
}

const CategoryLabel = ({
  active,
  activeClassName,
  classes,
  className,
  iconClassName,
  name,
  nameClassName,
  onClick,
  onMouseEnter,
  onMouseLeave,
  value,
  valueClassName,
  valueUnit,
}) => (
  <div
    className={cx(classes.root, active && activeClassName, className)}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    role="button"
    tabIndex={0}
  >
    <IconCircle className={cx(classes.icon, iconClassName)} />
    <HighlightText className={cx(classes.name, nameClassName)} text={name} />
    {(value || value === 0) && (
      <span className={cx(classes.value, valueClassName)}>
        {` ${value}`}
        {valueUnit && valueUnit}
      </span>
    )}
  </div>
)

export const categoryProps = {
  color: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
}

CategoryLabel.propTypes = {
  ...categoryProps,
  active: PropTypes.bool,
  activeClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  nameClassName: PropTypes.string,
  valueClassName: PropTypes.string,
  valueUnit: PropTypes.string,
}

export default injectStyles(styles)(CategoryLabel)
