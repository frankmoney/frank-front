// @flow
import * as React from 'react'
import cx from 'classnames'
import SwitchBase, { type OnChangeCb } from 'components/kit/SwitchBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import CheckIcon from './check.svg'

const SIZE = 18

const styles = {
  root: {
    width: SIZE,
    height: SIZE,
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: 3,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #D2D4DB',
    '&:hover': {
      borderColor: '#BCBFC9',
    },
  },
  disabled: {
    background: '#F8F9FA',
    borderColor: '#E9EAEE',
    pointerEvents: 'none',
  },
  checked: {
    border: 'none',
    background: '#484DE7',
    '&:hover': {
      background: '#4549DC',
    },
  },
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  },
}

type Props = {|
  ...InjectStylesProps,
  //
  checked?: boolean,
  defaultChecked?: boolean,
  disabled?: boolean,
  inputProps?: Object,
  inputRef?: ?Function,
  name?: string,
  onChange?: OnChangeCb,
|}

let InternalCheckbox = ({
  checked,
  classes,
  className,
  disabled,
  inputProps,
  inputRef,
  name,
  onChange,
}: Props) => (
  <div
    className={cx(
      classes.root,
      checked && classes.checked,
      disabled && classes.disabled,
      className
    )}
  >
    {checked && <CheckIcon />}
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
  </div>
)

InternalCheckbox = injectStyles(styles)(InternalCheckbox)

const Checkbox = ({ checked, defaultChecked, onChange, ...props }: Props) => (
  <SwitchBase on={checked} defaultOn={defaultChecked} onToggle={onChange}>
    {({ on, toggle }) => (
      <InternalCheckbox checked={on} onChange={toggle} {...props} />
    )}
  </SwitchBase>
)

export default Checkbox
