// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { type OnChangeCb } from 'components/kit/SwitchBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import CheckIcon from './check.svg'
import styles from './CheckboxDumb.jss'

type CheckboxColor = 'green' | 'blue'

export type CheckboxProps = {|
  checked?: boolean,
  color: CheckboxColor,
  defaultChecked?: boolean,
  disabled?: boolean,
  inputProps?: Object, // flowlint-line unclear-type:warn
  inputRef?: ?HTMLInputElement,
  hover?: boolean,
  label?: string,
  name?: string,
  hitzoneLeftCompensation?: boolean,
  disableExtendedHitZone: boolean,
  onChange?: OnChangeCb,
|}

type Props = {|
  ...CheckboxProps,
  ...InjectStylesProps,
|}

const CheckboxDumb = ({
  id,
  checked,
  color,
  classes,
  className,
  labelClassName,
  disabled,
  inputProps,
  inputRef,
  hover,
  label,
  name,
  onChange,
  onClick,
}: Props) => (
  <div
    className={cx(
      classes.root,
      {
        [classes.green]: color === 'green',
        [classes.blue]: color === 'blue',
        [classes.checked]: checked,
        [classes.hover]: hover,
        [classes.disabled]: disabled,
      },
      className
    )}
    onClick={onClick}
  >
    <input
      id={id}
      checked={checked}
      className={classes.input}
      disabled={disabled}
      name={name}
      onChange={disabled ? undefined : onChange}
      ref={inputRef}
      type="checkbox"
      {...inputProps}
    />
    <div className={classes.box}>
      {checked && <CheckIcon className={classes.checkmark} />}
    </div>
    {label && <div className={cx(classes.label, labelClassName)}>{label}</div>}
  </div>
)

CheckboxDumb.defaultProps = {
  color: 'blue',
  disableExtendedHitZone: false,
}

export default injectStyles(styles)(CheckboxDumb)
