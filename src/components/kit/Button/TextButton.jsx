// @flow
import * as React from 'react'
import cx from 'classnames'
import Spinner from 'components/kit/Spinner'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonBase, { type ButtonBaseProps } from './ButtonBase'
import styles from './TextButton.jss'

type TextButtonColor = 'black' | 'blue' | 'gray' | 'lightBlue'

type Props = {|
  ...ButtonBaseProps,
  ...InjectStylesProps,
  //
  active?: boolean,
  color: TextButtonColor,
  disabled?: boolean,
  hover?: boolean,
  label: string,
  larger?: boolean,
  loading?: boolean,
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
  larger,
  loading,
  ...baseButtonProps
}: Props) => (
  <ButtonBase
    className={cx(
      classes.root,
      {
        [classes.larger]: larger,
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
}

export default injectStyles(styles)(TextButton)
