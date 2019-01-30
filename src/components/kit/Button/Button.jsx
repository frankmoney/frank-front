// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import Counter from 'components/kit/Counter'
import Spinner from 'components/kit/Spinner'
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
  | 'lightGray'

type ButtonMixins = {|
  icon?: string,
|}

export type ButtonProps = {|
  ...ButtonBaseProps,
  //
  active: boolean,
  color: ButtonColor,
  counter?: string | number,
  disabled: boolean,
  focus: boolean,
  hover: boolean,
  icon?: React.Element<any>, // flowlint-line unclear-type:off
  label: string,
  loading: boolean,
  Mixins?: ButtonMixins,
  stretch: boolean,
  compactHeight: boolean,
|}

type Props = {|
  ...ButtonProps,
  ...InjectStylesProps,
|}

const Button = ({
  classes,
  className,
  Mixins,
  // states
  active,
  disabled,
  focus,
  hover,
  loading,
  stretch,
  compactHeight,
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
        [classes.lightGray]: color === 'lightGray',
        [classes.disabled]: disabled,
        [classes.loading]: loading,
        [classes.active]: active,
        [classes.focus]: focus,
        [classes.hover]: hover,
        [classes.stretch]: stretch,
        [classes.compactHeight]: compactHeight,
      },
      className
    )}
    disabled={disabled}
    {...baseButtonProps}
  >
    {icon &&
      React.cloneElement(icon, {
        className: cx(classes.icon, icon.props.className, Mixins.icon),
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
  color: 'gray',
  disabled: false,
  focus: false,
  hover: false,
  loading: false,
  stretch: false,
  Mixins: {},
}

export default injectStyles(styles)(Button)
