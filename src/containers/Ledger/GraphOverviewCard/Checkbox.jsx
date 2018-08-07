import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import MUICheckbox from 'material-ui/Checkbox'
import { injectStyles } from '@frankmoney/ui'

const INACTIVE_COLOR = '#CCCCCC'

const styles = {
  root: {
    color: INACTIVE_COLOR,
    paddingTop: 1,
  },
  checkbox: {
    marginTop: -1,
    height: 18,
    width: 18,
    color: INACTIVE_COLOR,
    '&$checked': {
      color: 'unset',
    },
  },
  checked: {},
  label: {
    color: INACTIVE_COLOR,
    marginLeft: 10,
    '&$checked': {
      color: 'unset',
    },
  },
}

const Checkbox = ({
  checked,
  classes,
  className,
  label,
  labelClassName,
  onChange,
  ...checkboxProps
}) => (
  <div className={cx(classes.root, className)}>
    <MUICheckbox
      checked={checked}
      className={cx(classes.checkbox, { [classes.checked]: checked })}
      disableRipple
      onChange={onChange}
      {...checkboxProps}
    />
    {label && (
      <span
        className={cx(
          classes.label,
          { [classes.checked]: checked },
          labelClassName
        )}
      >
        {label}
      </span>
    )}
  </div>
)

Checkbox.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func,
}

export default injectStyles(styles)(Checkbox)
