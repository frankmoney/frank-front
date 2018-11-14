// @flow
import * as React from 'react'
import cx from 'classnames'
import PlusIcon from 'material-ui-icons/Add'
import Spinner from 'components/kit/Spinner'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import ButtonBase, { type ButtonBaseProps } from './ButtonBase'
import styles from './BigButton.jss'

type ButtonMixins = {|
  iconClassName?: string,
|}

export type BigButtonProps = {|
  ...ButtonBaseProps,
  //
  active: boolean,
  disabled: boolean,
  hover: boolean,
  icon: React.Element<any>,
  label: string,
  loading: boolean,
  Mixins?: ButtonMixins,
|}

type Props = {|
  ...BigButtonProps,
  ...InjectStylesProps,
|}

const BigButton = ({
  classes,
  className,
  Mixins,
  // states
  active,
  disabled,
  hover,
  loading,
  // content
  icon,
  label,
  ...baseButtonProps
}: Props) => (
  <ButtonBase
    className={cx(
      classes.root,
      {
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
        className: cx(classes.icon, Mixins && Mixins.iconClassName),
      })}
    <div className={classes.label}>{label}</div>
    {loading && <Spinner className={classes.spinner} size={20} />}
  </ButtonBase>
)

BigButton.defaultProps = {
  active: false,
  disabled: false,
  hover: false,
  icon: <PlusIcon />,
  loading: false,
}

export default injectStyles(styles)(BigButton)
