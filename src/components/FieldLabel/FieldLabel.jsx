import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = theme => ({
  root: {
    display: 'block',
    marginBottom: 14,
  },
  title: {
    fontWeight: 500,
    color: ({ focus }) => (focus ? theme.colors.blue : '#9094a5'),
  },
  hint: {
    fontWeight: 400,
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
  <div className={cx(className, classes.root)} {...otherProps}>
    <span className={cx(titleClassName, classes.title)}>{title}</span>
    {hint && <span className={cx(hintClassName, classes.hint)}>{hint}</span>}
  </div>
)

export default injectStyles(styles)(FieldLabel)
