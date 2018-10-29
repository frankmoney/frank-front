// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import HighlightText from 'components/HighlightText'
import IconCircle from 'components/IconCircle'
import type { Props } from './CategoryLabel.flow'

const styles = {
  root: {
    alignItems: 'center',
    color: ({ color }) => color,
    display: 'flex',
    outline: 'none',
  },
  icon: {
    flexShrink: 0,
    height: 16,
    width: 16,
    marginRight: 10,
  },
  name: {},
  value: {
    marginLeft: 4,
    opacity: 0.55,
  },
}

const CategoryLabel = ({
  active,
  activeClassName,
  classes,
  className,
  iconClassName,
  name,
  nameClassName,
  onClick,
  onMouseEnter,
  onMouseLeave,
  value,
  valueClassName,
  valueUnit,
}: Props) => {
  const renderedValue = R.not(R.isNil(value)) || value === 0 ? value : undefined
  return (
    <div
      className={cx(classes.root, active && activeClassName, className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
    >
      <IconCircle className={cx(classes.icon, iconClassName)} />
      <HighlightText className={cx(classes.name, nameClassName)} text={name} />
      {renderedValue && (
        <span className={cx(classes.value, valueClassName)}>
          {` ${renderedValue}`}
          {valueUnit && valueUnit}
        </span>
      )}
    </div>
  )
}

export default injectStyles(styles)(CategoryLabel)
