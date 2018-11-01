// @flow
import * as React from 'react'
import cx from 'classnames'
import { Spinner } from '@frankmoney/components' // TODO: replace with the kit version
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonBase, { type ButtonBaseProps } from './ButtonBase'
import styles from './TextButton.jss'

type TextButtonColor = 'black' | 'blue' | 'gray' | 'lightBlue'

type TextButtonSize = 16 | 18

type Props = {|
  ...ButtonBaseProps,
  ...InjectStylesProps,
  //
  active?: boolean,
  color: TextButtonColor,
  disabled?: boolean,
  hover?: boolean,
  label: string,
  loading?: boolean,
  size: TextButtonSize,
  thin?: boolean,
|}

const TextButton = ({
  classes,
  className,
  // states
  active,
  disabled,
  hover,
  // content
  color,
  label,
  loading,
  size,
  thin,
  ...baseButtonProps
}: Props) => (
  <ButtonBase
    className={cx(
      classes.root,
      {
        [classes.larger]: size === 18,
        [classes.thin]: thin,
        [classes.black]: color === 'black',
        [classes.blue]: color === 'blue',
        [classes.lightBlue]: color === 'lightBlue',
        [classes.gray]: color === 'gray',
        [classes.active]: active,
        [classes.hover]: hover,
        [classes.disabled]: disabled,
        [classes.loading]: loading,
      },
      className
    )}
    {...baseButtonProps}
  >
    <span>{label}</span>
    {loading && <Spinner className={classes.spinner} size={20} />}
  </ButtonBase>
)

TextButton.defaultProps = {
  active: false,
  disabled: false,
  hover: false,
  color: 'black',
  size: 16,
}

export default injectStyles(styles)(TextButton)
