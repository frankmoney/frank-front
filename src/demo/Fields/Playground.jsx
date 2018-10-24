import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { compose, withStateHandlers } from 'recompose'
import Field from 'components/kit/fields/Field'
import TextBox from 'components/kit/fields/TextBox'
import Switch from 'components/kit/Switch'
import Label from 'components/kit/fields/Label'

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

const checkGay = name => ['tom'].includes(name.toLowerCase())

const Playground = ({
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
      <Field
        larger={larger}
        className={classes.field}
        label={!floatingLabel && 'Name'}
        additionalLabel={additionalLabel && 'Should be fancy'}
        floatingLabel={floatingLabel && 'Name'}
        placeholder={placeholder && 'Frank Sinatra'}
        focus={focus}
        error={error && (checkGay(value) ? 'Check another gay' : 'Not a gay')}
        invalid={error}
        disabled={disabled}
        loading={loading}
        hint={hint && '140 symbols left'}
      >
        <TextBox
          value={value}
          autoFocus
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          multiLine={multiline}
        />
      </Field>
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
    }
  )
)(Playground)
