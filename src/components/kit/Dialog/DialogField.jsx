import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Field from 'components/kit/fields/Field'

const styles = {
  root: {
    marginBottom: 35,
  },
}

const DialogField = ({ classes, className, theme, ...otherProps }) => (
  <Field className={cx(classes.root, className)} {...otherProps} stretch />
)

export default injectStyles(styles)(DialogField)
