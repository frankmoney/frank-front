// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import SwitchBase, { type OnChangeCb } from 'components/kit/SwitchBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import CheckIcon from './check.svg'
import styles from './Checkbox.jss'

type CheckboxColor = 'green' | 'blue'

type CheckboxProps = {|
  checked?: boolean,
  color: CheckboxColor,
  defaultChecked?: boolean,
  disabled?: boolean,
  inputProps?: Object, // flowlint-line unclear-type:warn
  inputRef?: ?HTMLInputElement,
  hover?: boolean,
  label?: string,
  name?: string,
  onChange?: OnChangeCb,
|}

type Props = {|
  ...CheckboxProps,
  ...InjectStylesProps,
|}

type PublicProps = {|
  ...CheckboxProps,
  //
  className?: string,
|}

const InternalCheckbox = ({
  checked,
  color,
  classes,
  className,
  disabled,
  inputProps,
  inputRef,
  hover,
  label,
  name,
  onChange,
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
  >
    <input
      checked={checked}
      className={classes.input}
      disabled={disabled}
      name={name}
      onChange={disabled ? undefined : onChange}
      ref={inputRef}
      type="checkbox"
      {...inputProps}
    />
    <div className={classes.box}>{checked && <CheckIcon />}</div>
    {label && <div className={classes.label}>{label}</div>}
  </div>
)

const StyledInternalCheckbox = injectStyles(styles)(InternalCheckbox)

const Checkbox = ({
  checked,
  defaultChecked,
  onChange,
  ...props
}: PublicProps) => (
  <SwitchBase on={checked} defaultOn={defaultChecked} onToggle={onChange}>
    {({ on, toggle }) => (
      <StyledInternalCheckbox checked={on} onChange={toggle} {...props} />
    )}
  </SwitchBase>
)

Checkbox.defaultProps = {
  color: 'blue',
}

export default Checkbox
