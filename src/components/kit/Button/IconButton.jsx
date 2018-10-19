// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Spinner } from '@frankmoney/components'
import ButtonBase from './ButtonBase'
import styles from './IconButton.jss'

type ButtonColor =
  | 'red'
  | 'green'
  | 'blue'
  | 'gray'
  | 'lightBlue'
  | 'lightGreen'

type Props = {
  active?: boolean,
  disabled?: boolean,
  hover?: boolean,
  icon: React.ReactNode,
  color: IconButtonColor,
}

const IconButton = ({
  children,
  classes,
  className,
  // states
  active,
  disabled,
  hover,
  loading,
  // content
  icon,
  color,
  ...baseButtonProps
}: Props) => (
  <ButtonBase
    className={cx(
      classes.root,
      {
        [classes.green]: color === 'green',
        [classes.gray]: color === 'gray',
        [classes.blue]: color === 'blue',
        [classes.lightBlue]: color === 'lightBlue',
        [classes.lightGreen]: color === 'lightGreen',
        [classes.disabled]: disabled,
        [classes.loading]: loading,
        [classes.active]: active,
        [classes.hover]: hover,
      },
      className
    )}
    {...baseButtonProps}
  >
    {icon}
    {loading && <Spinner className={classes.spinner} size={20} />}
  </ButtonBase>
)

IconButton.defaultProps = {
  active: false,
  disabled: false,
  hover: false,
  loading: false,
  color: 'gray',
}

export default injectStyles(styles)(IconButton)
