// @flow strict-local
import React from 'react'
import cx from 'classnames'
import SeparatorIcon from 'material-ui-icons/ArrowForward'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    margin: [1, 9, 0, 10],
    width: 22,
    height: 22,
  },
}

const Separator = ({ classes, className, ...props }) => (
  <SeparatorIcon className={cx(classes.root, className)} {...props} />
)

export default injectStyles(styles)(Separator)
