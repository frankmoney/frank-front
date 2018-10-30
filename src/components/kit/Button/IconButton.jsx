// @flow
import * as React from 'react'
import cx from 'classnames'
import { Spinner } from '@frankmoney/components'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonBase, { type ButtonBaseProps } from './ButtonBase'
import styles from './IconButton.jss'

type IconButtonColor =
  | 'red'
  | 'green'
  | 'blue'
  | 'gray'
  | 'lightBlue'
  | 'lightGreen'

type Props = {|
  ...ButtonBaseProps,
  ...InjectStylesProps,
  //
  active?: boolean,
  disabled?: boolean,
  hover?: boolean,
  icon: React.Node,
  color: IconButtonColor,
  loading?: boolean,
|}

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
