import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { compose, withStateHandlers } from 'recompose'
import TextField from 'components/kit/TextField'
import Switch from 'components/kit/Switch'
import Label from 'components/kit/fields/Label'
import SelectField from 'components/kit/SelectField'
import { MenuItem } from 'components/kit/Menu'

const styles = {
  root: {},
  field: {
    width: 340,
  },
  options: {
    marginTop: 40,
    display: 'flex',
    alignItems: 'flex-start',
  },
  col: {
    width: 170,
  },
  opt: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    cursor: 'pointer',
  },
  label: {
    marginLeft: 10,
    cursor: 'pointer',
  },
}

const TextFieldPlayground = ({
  classes,
  value,
  focus,
  error,
  floatingLabel,
  placeholder,
  loading,
  larger,
  disabled,
  multiline,
  inputType,
  additionalLabel,
  hint,
  onFocus,
  onBlur,
  onChange,
  toggleFocus,
  toggleError,
  toggleDisabled,
  togglePlaceholder,
  toggleLoading,
  toggleFloating,
  toggleLarger,
  toggleMultiline,
  toggleHint,
  toggleAdditionalLabel,
  changeInputType,
  className,
}) => {
  const Opt = ({ label, on, onToggle }) => (
    <div className={classes.opt} onMouseUp={onToggle}>
      <Switch className={classes.switch} checked={on} />
      <Label className={classes.label}>{label}</Label>
    </div>
  )

  return (
    <div className={cx(classes.root, className)}>
      <TextField
        larger={larger}
        className={classes.field}
        label={!floatingLabel && 'Name'}
        additionalLabel={additionalLabel && 'Should be fancy'}
        floatingLabel={floatingLabel && 'Name'}
        placeholder={placeholder && 'Frank Sinatra'}
        focus={focus}
        error={error && 'Error'}
        invalid={error}
        disabled={disabled}
        loading={loading}
        hint={hint && '140 symbols left'}
        type={inputType}
        value={value}
        onChange={onChange}
        autoFocus
        onFocus={onFocus}
        onBlur={onBlur}
        multiLine={multiline}
      />
      <div className={classes.options}>
        <div className={classes.col}>
          <Opt label="Focus" on={focus} onToggle={!disabled && toggleFocus} />
          <Opt label="Error" on={error} onToggle={toggleError} />
          <Opt label="Disabled" on={disabled} onToggle={toggleDisabled} />
          <Opt label="Loading" on={loading} onToggle={toggleLoading} />
          <Opt label="Multiline" on={multiline} onToggle={toggleMultiline} />
        </div>
        <div className={classes.col}>
          <Opt
            label="Placeholder"
            on={placeholder}
            onToggle={togglePlaceholder}
          />
          <Opt
            label="Floating label"
            on={floatingLabel}
            onToggle={toggleFloating}
          />
          <Opt label="Larger" on={larger} onToggle={toggleLarger} />
          <Opt
            label="Value"
            on={!!value}
            onToggle={() => onChange(value ? '' : 'Tom')}
          />
          <Opt label="Hint" on={hint} onToggle={toggleHint} />
          <Opt
            label="Additional label"
            on={additionalLabel}
            onToggle={toggleAdditionalLabel}
          />
        </div>
      </div>
      <div className={classes.options}>
        <div className={classes.col}>
          <SelectField
            value={inputType}
            onChange={changeInputType}
            style={{ width: 200 }}
          >
            <MenuItem label="type=text" value="text" />
            <MenuItem label="type=password" value="password" />
            <MenuItem label="type=number" value="number" />
            <MenuItem label="type=email" value="email" />
          </SelectField>
        </div>
      </div>
    </div>
  )
}

export default compose(
  injectStyles(styles),
  withStateHandlers(
    {
      disabled: false,
      value: '',
      placeholder: true,
      larger: true,
      inputType: 'text',
    },
    {
      onFocus: () => () => ({ focus: true }),
      onBlur: () => () => ({ focus: false }),
      toggleFocus: props => () => ({ focus: !props.focus }),
      toggleError: props => () => ({ error: !props.error }),
      toggleDisabled: props => () => ({
        disabled: !props.disabled,
      }),
      toggleFilled: props => () => ({ filled: !props.filled }),
      toggleHint: props => () => ({ hint: !props.hint }),
      toggleAdditionalLabel: props => () => ({
        additionalLabel: !props.additionalLabel,
      }),
      togglePlaceholder: props => () => ({ placeholder: !props.placeholder }),
      toggleLoading: props => () => ({ loading: !props.loading }),
      toggleFloating: props => () => ({ floatingLabel: !props.floatingLabel }),
      toggleLarger: props => () => ({ larger: !props.larger }),
      toggleMultiline: props => () => ({ multiline: !props.multiline }),
      onChange: () => value => ({ value }),
      changeInputType: () => value => ({ inputType: value }),
    }
  )
)(TextFieldPlayground)
