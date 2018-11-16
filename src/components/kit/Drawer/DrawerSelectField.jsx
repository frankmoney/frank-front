import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import SelectField from 'components/kit/SelectField'

const styles = {
  root: {
    margin: [0, 30],
    marginBottom: 35,
    flexShrink: 0,
  },
}

const DrawerTextField = ({ classes, className, theme, ...otherProps }) => (
  <SelectField.Left
    stretchDropdown
    className={cx(classes.root, className)}
    {...otherProps}
  />
)

export default injectStyles(styles)(DrawerTextField)
