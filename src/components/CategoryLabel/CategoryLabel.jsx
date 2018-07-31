import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import HighlightText from 'components/HighlightText'

const styles = {
  root: {
    color: ({ color }) => color,
  },
  icon: {
    display: 'inline-block',
    content: '" "',
    width: ({ size }) => size,
    height: ({ size }) => size,
    borderRadius: '50%',
    background: ({ color }) => color,
    stroke: ({ color }) => color,
    fill: ({ color }) => color,
    marginRight: 10,
  },
  name: {},
  counter: {},
}

const CategoryLabel = ({
  className,
  classes,
  name,
  highlighted,
  color,
  size,
  counter,
  counterUnit,
  ...otherProps
}) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    <span className={classes.icon} />
    <HighlightText
      className={classes.name}
      text={name}
      textPattern={highlighted}
    />
    {counter && (
      <span className={classes.counter}>
        {` ${counter}`}
        {counterUnit && counterUnit}
      </span>
    )}
  </div>
)

export default injectStyles(styles)(CategoryLabel)
