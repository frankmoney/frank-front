// @flow strict-local
import React from 'react'
import cx from 'classnames'
import HighlightText from 'components/HighlightText'
import IconCircle from 'components/IconCircle'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

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

type EmptyCb = () => void

export type Props = {|
  ...InjectStylesProps,
  //
  active?: boolean,
  color?: string,
  disableFocusable?: boolean,
  name?: string,
  value?: number,
  valueUnit?: string,
  // Handlers
  onClick?: EmptyCb,
  onMouseEnter?: EmptyCb,
  onMouseLeave?: EmptyCb,
  // Styles
  activeClassName?: string,
  iconClassName?: string,
  nameClassName?: string,
  valueClassName?: string,
|}

const CategoryLabel = ({
  active,
  activeClassName,
  classes,
  className,
  disableFocusable,
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
  const renderValue = typeof value === 'number'
  return (
    <div
      className={cx(classes.root, active && activeClassName, className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role={disableFocusable ? null : 'button'}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={disableFocusable ? null : 0}
    >
      <IconCircle className={cx(classes.icon, iconClassName)} />
      <HighlightText className={cx(classes.name, nameClassName)} text={name} />
      {renderValue && (
        <span className={cx(classes.value, valueClassName)}>
          {value}
          {!!valueUnit && valueUnit}
        </span>
      )}
    </div>
  )
}

export default injectStyles(styles)(CategoryLabel)
