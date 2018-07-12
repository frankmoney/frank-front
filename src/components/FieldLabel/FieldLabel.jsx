import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = {
  root: {
    display: 'block',
    marginBottom: 14,
  },
  title: {
    fontWeight: 500,
    color: ({ focus }) => (focus ? '#484DE7' : '#9094A5'),
  },
  hint: {
    fontWeight: 400,
    paddingLeft: 8,
    color: ({ focus }) => (focus ? '#A4A6F3' : '#D5D7DD'),
  },
}

const FieldLabel = ({
  classes,
  className,
  title,
  hint,
  focus,
  ...otherProps
}) => (
  <div className={cx(className, classes.root)} {...otherProps}>
    <span className={classes.title}>{title}</span>
    {hint && <span className={classes.hint}>{hint}</span>}
  </div>
)

export default injectStyles(styles)(FieldLabel)
