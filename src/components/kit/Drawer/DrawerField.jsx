import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Field from 'components/kit/fields/Field'

const styles = {
  root: {
    margin: [0, 30],
    marginBottom: 35,
    flexShrink: 0,
  },
}

const DrawerField = ({ classes, className, theme, ...otherProps }) => (
  <Field className={cx(classes.root, className)} {...otherProps} />
)

export default injectStyles(styles)(DrawerField)
