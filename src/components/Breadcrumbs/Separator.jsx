// @flow strict-local
import React from 'react'
import SeparatorIcon from 'material-ui-icons/ArrowForward'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    color: '#989BA4',
    margin: [1, 9, 0, 10],
  },
}

const Separator = ({ classes, className, ...props }) => (
  <SeparatorIcon className={classes.root} {...props} />
)

export default injectStyles(styles)(Separator)
