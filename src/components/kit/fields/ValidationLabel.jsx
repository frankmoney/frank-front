import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { LABEL_FONT_SIZE } from './Field.jss'

const styles = theme => ({
  root: {
    color: 'rgba(37, 43, 67, 0.2)',
    fontSize: LABEL_FONT_SIZE,
    lineHeight: LABEL_FONT_SIZE,
    transition: [theme.transition('opacity'), theme.transition('color')].join(
      ','
    ),
  },
  invalid: {
    color: '#C70000',
  },
})

const ValidationLabel = ({ classes, className, invalid, children }) => (
  <div className={cx(classes.root, invalid && classes.invalid, className)}>
    {children}
  </div>
)

export default injectStyles(styles)(ValidationLabel)
