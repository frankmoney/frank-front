// @flow
import * as React from 'react'
import cx from 'classnames'
import { Spinner } from '@frankmoney/components'
import Counter from 'components/kit/Counter'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonBase, { type ButtonBaseProps } from './ButtonBase'
import styles from './Button.jss'

type ButtonColor =
  | 'red'
  | 'green'
  | 'blue'
  | 'gray'
  | 'lightBlue'
  | 'lightGreen'

type ButtonMixins = {|
  icon?: string,
|}

type Props = {|
  ...ButtonBaseProps,
  ...InjectStylesProps,
  //
  active?: boolean,
  color: ButtonColor,
  counter?: string | number,
  disabled?: boolean,
  hover?: boolean,
  icon?: React.Element<any>,
  label: string,
  loading: boolean,
  Mixins?: ButtonMixins,
|}

const Button = ({
  children,
  classes,
  className,
  Mixins,
  // states
  active,
  disabled,
  hover,
  loading,
  // content
  label,
  counter,
  icon,
  color,
  ...baseButtonProps
}: Props) => (
  <ButtonBase
    className={cx(
      classes.root,
      {
        [classes.red]: color === 'red',
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
    {icon &&
      React.cloneElement(icon, {
        className: cx(classes.icon, Mixins && Mixins.icon),
      })}
    <div className={classes.label}>{label}</div>
    {typeof counter !== 'undefined' && (
      <Counter className={classes.counter}>{counter}</Counter>
    )}
    {loading && <Spinner className={classes.spinner} size={20} />}
  </ButtonBase>
)

Button.defaultProps = {
  active: false,
  disabled: false,
  hover: false,
  loading: false,
  color: 'gray',
  Mixins: {},
}

export default injectStyles(styles)(Button)
