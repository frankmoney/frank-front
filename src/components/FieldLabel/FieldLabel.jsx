import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = theme => ({
  root: {
    display: 'block',
    marginBottom: 14,
    ...theme.fontRegular(14),
  },
  title: {
    fontWeight: 500,
    color: ({ focus }) => (focus ? theme.colors.blue : 'rgba(32, 40, 74, 0.5)'),
  },
  hint: {
    paddingLeft: 8,
    color: ({ focus }) => (focus ? '#a4a6f3' : '#d5d7dd'),
  },
})

const FieldLabel = ({
  classes,
  className,
  titleClassName,
  hintClassName,
  title,
  hint,
  focus,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    <span className={cx(classes.title, titleClassName)}>{title}</span>
    {hint && <span className={cx(classes.hint, hintClassName)}>{hint}</span>}
  </div>
)

export default injectStyles(styles)(FieldLabel)
