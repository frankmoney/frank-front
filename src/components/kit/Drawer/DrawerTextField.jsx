import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import LeftField from 'components/kit/fields/LeftField'
import TextBox from 'components/kit/TextBox'

const styles = {
  root: {
    margin: [0, 30],
    marginBottom: 35,
    flexShrink: 0,
  },
}

const DrawerTextField = ({
  classes,
  className,
  theme,
  multiLine,
  ...otherProps
}) => (
  <LeftField stretch className={cx(classes.root, className)} {...otherProps}>
    <TextBox multiLine={multiLine} />
  </LeftField>
)

export default injectStyles(styles)(DrawerTextField)
